import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  MapPin,
  Users,
  FileText,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Button } from '../components/FormElements';
import { Card, Modal, Tabs } from '../components/UI';
import { Badge } from '../components/UI';
import toast from 'react-hot-toast';
import {
  formatCurrency,
  formatDateTime,
  getStatusLabel,
  getStatusColor,
  calculateDealValue,
} from '../utils/helpers';

/**
 * DealDetails - View and manage individual deal details
 * Shows proposal summary, timeline, history, and negotiation options
 */
export const DealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProposalById, updateProposalWithHistory, addNegotiationMessage, events } =
    useMarketplace();
  const { createInvoice, createTransaction } = useBilling();

  const [proposal, setProposal] = React.useState(() => getProposalById(id));
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [proposedAmount, setProposedAmount] = useState(proposal?.sponsorshipAmount || 0);
  const [loading, setLoading] = useState(false);

  if (!proposal) {
    return (
      <MainLayout>
        <div className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Deal not found</h2>
            <Button
              onClick={() => navigate('/deals')}
              className="mt-4"
            >
              Back to Deals
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const event = events.find((e) => e.id === proposal.eventId);
  const tier = event?.sponsorshipTiers.find((t) => t.id === proposal.tierId);
  const { commission, organizerReceives } = calculateDealValue(
    proposal.sponsorshipAmount
  );

  const canAcceptProposal = user?.role === 'organizer' && proposal.status === 'pending';
  const canRejectProposal = user?.role === 'organizer' && proposal.status === 'pending';
  const canNegotiate =
    (user?.role === 'organizer' || user?.role === 'sponsor') &&
    ['pending', 'reviewing', 'negotiating'].includes(proposal.status);

  const handleAcceptProposal = async () => {
    setLoading(true);
    try {
      await updateProposalWithHistory(proposal.id, {
        status: 'accepted',
        changedBy: user.id,
        notes: 'Proposal accepted by organizer',
      });

      // Create invoice and transaction
      await createInvoice(proposal, proposal.sponsorId, event.organizerId);
      await createTransaction(proposal, proposal.sponsorId, event.organizerId);

      setProposal(getProposalById(id));
      toast.success('Proposal accepted! Invoice and payment details created.');
    } catch (err) {
      toast.error('Failed to accept proposal');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectProposal = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return;

    setLoading(true);
    try {
      await updateProposalWithHistory(proposal.id, {
        status: 'rejected',
        changedBy: user.id,
        notes: 'Proposal rejected by organizer',
      });

      setProposal(getProposalById(id));
      toast.success('Proposal rejected');
    } catch (err) {
      toast.error('Failed to reject proposal');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNegotiation = async () => {
    if (!negotiationMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setLoading(true);
    try {
      await addNegotiationMessage(proposal.id, {
        from: user.id,
        type: 'counter_offer',
        message: negotiationMessage,
        proposedAmount: proposedAmount,
        proposedTerms: negotiationMessage,
      });

      // Update proposal status to negotiating if not already
      if (proposal.status === 'pending' || proposal.status === 'reviewing') {
        await updateProposalWithHistory(proposal.id, {
          status: 'negotiating',
          changedBy: user.id,
          notes: 'Negotiation initiated',
        });
      }

      setProposal(getProposalById(id));
      setNegotiationMessage('');
      setProposedAmount(proposal.sponsorshipAmount);
      setShowNegotiationModal(false);
      toast.success('Negotiation message sent');
    } catch (err) {
      toast.error('Failed to send negotiation message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Timeline Component
  const Timeline = () => {
    const history = proposal.history || [];

    return (
      <div className="space-y-6">
        {history.length === 0 ? (
          <p className="text-neutral-600">No history available</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary-600 rounded-full" />
                {index < history.length - 1 && (
                  <div className="w-0.5 h-16 bg-neutral-300 mt-2" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getStatusColor(entry.status)}>
                    {getStatusLabel(entry.status)}
                  </Badge>
                  <p className="text-sm text-neutral-600">
                    {formatDateTime(entry.timestamp)}
                  </p>
                </div>
                <p className="text-neutral-900 font-medium">{entry.notes}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Negotiations Component
  const Negotiations = () => {
    const negotiations = proposal.negotiations || [];

    return (
      <div className="space-y-4">
        {negotiations.length === 0 ? (
          <p className="text-neutral-600">No negotiations yet</p>
        ) : (
          negotiations.map((neg) => (
            <Card key={neg.id} size="lg">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">Counter Offer</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {formatDateTime(neg.timestamp)}
                    </p>
                  </div>
                  {neg.proposedAmount !== proposal.sponsorshipAmount && (
                    <div className="text-right">
                      <p className="text-sm text-neutral-600">Proposed Amount</p>
                      <p className="text-lg font-bold text-primary-600">
                        {formatCurrency(neg.proposedAmount)}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-neutral-700">{neg.message}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    );
  };

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Deal Summary */}
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Deal Summary</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-neutral-600 font-medium">Sponsorship Amount</p>
                <p className="text-2xl font-bold text-neutral-900 mt-2">
                  {formatCurrency(proposal.sponsorshipAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-medium">Sponsorship Tier</p>
                <p className="text-2xl font-bold text-neutral-900 mt-2">
                  {tier?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-medium">Status</p>
                <div className="mt-2">
                  <Badge variant={getStatusColor(proposal.status)}>
                    {getStatusLabel(proposal.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-medium">Created</p>
                <p className="text-base text-neutral-900 mt-2">{proposal.createdAt}</p>
              </div>
            </div>
          </Card>

          {/* Platform Breakdown */}
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Payment Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-neutral-700">Sponsorship Amount</p>
                <p className="font-bold text-neutral-900">
                  {formatCurrency(proposal.sponsorshipAmount)}
                </p>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-b border-neutral-200">
                <p className="text-neutral-700">Platform Commission (15%)</p>
                <p className="font-bold text-orange-600">
                  -{formatCurrency(commission)}
                </p>
              </div>
              <div className="flex items-center justify-between text-lg">
                <p className="font-bold text-neutral-900">Organizer Receives</p>
                <p className="font-bold text-green-600">
                  {formatCurrency(organizerReceives)}
                </p>
              </div>
            </div>
          </Card>

          {/* Event Details */}
          {event && (
            <Card size="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Location</p>
                    <p className="text-neutral-900 font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Expected Audience</p>
                    <p className="text-neutral-900 font-medium">
                      {event.audience?.size?.toLocaleString() || 'N/A'} in-person
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Date</p>
                    <p className="text-neutral-900 font-medium">
                      {event.date} to {event.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Proposal Message */}
          {proposal.proposal?.message && (
            <Card size="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Proposal Message
              </h3>
              <p className="text-neutral-700">{proposal.proposal.message}</p>
              {proposal.proposal?.additionalRequests && (
                <>
                  <h4 className="text-sm font-bold text-neutral-900 mt-4 mb-2">
                    Additional Requests
                  </h4>
                  <p className="text-neutral-700">
                    {proposal.proposal.additionalRequests}
                  </p>
                </>
              )}
            </Card>
          )}
        </div>
      ),
    },
    {
      label: 'Timeline',
      content: <Timeline />,
    },
    {
      label: 'Negotiations',
      content: <Negotiations />,
    },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/deals')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-900" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {event?.name || 'Deal Details'}
            </h1>
            <p className="text-neutral-600 mt-1">
              {tier?.name || 'Sponsorship Tier'} •{' '}
              {formatCurrency(proposal.sponsorshipAmount)}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs tabs={tabs} />
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <Card size="lg">
              <div className="space-y-3">
                {canAcceptProposal && (
                  <Button
                    variant="primary"
                    onClick={handleAcceptProposal}
                    loading={loading}
                    className="w-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Proposal
                  </Button>
                )}

                {canRejectProposal && (
                  <Button
                    variant="secondary"
                    onClick={handleRejectProposal}
                    loading={loading}
                    className="w-full"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Reject Proposal
                  </Button>
                )}

                {canNegotiate && (
                  <Button
                    variant="secondary"
                    onClick={() => setShowNegotiationModal(true)}
                    className="w-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Counter Offer
                  </Button>
                )}

                {proposal.status === 'accepted' && (
                  <Link to={`/billing?proposal=${proposal.id}`}>
                    <Button variant="primary" className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      View Payment
                    </Button>
                  </Link>
                )}
              </div>
            </Card>

            {/* Deal Info Card */}
            <Card size="lg">
              <h3 className="text-sm font-bold text-neutral-900 mb-4">Deal Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-600">Status</p>
                  <Badge variant={getStatusColor(proposal.status)} className="mt-1">
                    {getStatusLabel(proposal.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-neutral-600">Created</p>
                  <p className="text-neutral-900 font-medium mt-1">
                    {proposal.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-600">Last Updated</p>
                  <p className="text-neutral-900 font-medium mt-1">
                    {proposal.updatedAt}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Negotiation Modal */}
        <Modal
          isOpen={showNegotiationModal}
          onClose={() => setShowNegotiationModal(false)}
          title="Send Counter Offer"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Proposed Amount
              </label>
              <div className="flex items-center gap-2">
                <span className="text-neutral-600">$</span>
                <input
                  type="number"
                  value={proposedAmount}
                  onChange={(e) => setProposedAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                Original: {formatCurrency(proposal.sponsorshipAmount)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Message
              </label>
              <textarea
                value={negotiationMessage}
                onChange={(e) => setNegotiationMessage(e.target.value)}
                placeholder="Describe your counter offer and any additional terms..."
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowNegotiationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSendNegotiation}
                loading={loading}
                className="flex-1"
              >
                Send Counter Offer
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default DealDetails;
