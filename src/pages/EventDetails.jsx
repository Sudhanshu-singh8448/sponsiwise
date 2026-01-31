import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Zap,
  CheckCircle,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../layouts';
import { Button, Card, Badge, Modal } from '../components';
import { formatCurrency, formatDate, formatNumber } from '../utils/helpers';
import { Alert, Loading } from '../components';

/**
 * Event Details Page
 */
export const EventDetails = () => {
  const { eventId } = useParams();
  const { getEventById, createProposal, loading } = useMarketplace();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [proposal, setProposal] = useState({
    message: '',
    additionalRequests: '',
  });
  const [proposalLoading, setProposalLoading] = useState(false);

  const event = getEventById(eventId);

  if (!event) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Event Not Found</h1>
          <p className="text-neutral-600 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedTier) {
      alert('Please select a sponsorship tier');
      return;
    }

    setProposalLoading(true);
    try {
      await createProposal({
        eventId: event.id,
        sponsorId: user.id,
        tierId: selectedTier.id,
        sponsorshipAmount: selectedTier.price,
        currency: selectedTier.currency,
        proposal: {
          message: proposal.message,
          additionalRequests: proposal.additionalRequests,
        },
      });

      setShowProposalModal(false);
      setProposal({ message: '', additionalRequests: '' });
      alert('Proposal submitted successfully!');
      navigate('/deals');
    } catch (err) {
      alert('Failed to submit proposal: ' + err.message);
    } finally {
      setProposalLoading(false);
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <Loading message="Loading event details..." />
      ) : (
        <>
          {/* Hero Image */}
          <div className="w-full h-96 bg-neutral-200 overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title & Basic Info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge>{event.category}</Badge>
                    {event.verified && (
                      <Badge variant="success">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                    {event.name}
                  </h1>
                  <p className="text-lg text-neutral-600">{event.description}</p>
                </div>

                {/* Key Details */}
                <Card size="lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-2">
                        DATE
                      </p>
                      <div className="flex items-center gap-2 text-neutral-900">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">
                          {formatDate(event.date)} - {formatDate(event.endDate)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-2">
                        LOCATION
                      </p>
                      <div className="flex items-center gap-2 text-neutral-900">
                        <MapPin className="w-5 h-5" />
                        <span className="font-semibold">{event.location}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-2">
                        AUDIENCE
                      </p>
                      <div className="flex items-center gap-2 text-neutral-900">
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">
                          {formatNumber(event.audience.size)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Expected Reach */}
                <Card size="lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">
                    Expected Reach & Impact
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: 'In-Person',
                        value: event.expectedReach.inPerson,
                      },
                      {
                        label: 'Online Reach',
                        value: event.expectedReach.online,
                      },
                      {
                        label: 'Social Media',
                        value: event.expectedReach.socialMedia,
                      },
                    ].map((reach, i) => (
                      <div key={i} className="p-4 bg-primary-50 rounded-lg">
                        <p className="text-sm text-neutral-600 font-medium mb-2">
                          {reach.label}
                        </p>
                        <p className="text-2xl font-bold text-primary-600">
                          {formatNumber(reach.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Audience Demographics */}
                <Card size="lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">
                    Audience Demographics
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-neutral-600 font-medium mb-2 block">
                        Age Range
                      </label>
                      <p className="text-lg font-semibold text-neutral-900">
                        {event.audience.demographics.ageRange}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-neutral-600 font-medium mb-2 block">
                        Interests
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {event.audience.demographics.interests.map((interest, i) => (
                          <Badge key={i} variant="primary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-neutral-600 font-medium mb-2 block">
                        Industries
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {event.audience.demographics.industries.map((industry, i) => (
                          <Badge key={i} variant="primary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Organizer */}
                <Card size="lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    About the Organizer
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold">
                        {event.organizer?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        {event.organizer?.organizationName}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {event.organizer?.name}
                      </p>
                    </div>
                    <Badge variant="success" className="ml-auto">
                      Verified
                    </Badge>
                  </div>

                  <p className="text-neutral-600">
                    {event.organizer?.description}
                  </p>
                </Card>
              </div>

              {/* Sidebar - Sponsorship Tiers */}
              <div className="lg:col-span-1 space-y-6">
                {event.sponsorshipTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    size="lg"
                    className={`cursor-pointer transition-all ${
                      selectedTier?.id === tier.id
                        ? 'ring-2 ring-primary-600'
                        : ''
                    }`}
                    onClick={() => setSelectedTier(tier)}
                  >
                    <h4 className="text-lg font-bold text-neutral-900 mb-2">
                      {tier.name}
                    </h4>

                    <p className="text-3xl font-bold text-primary-600 mb-4">
                      {formatCurrency(tier.price)}
                    </p>

                    {tier.slots && (
                      <p className="text-sm text-neutral-600 mb-4">
                        {tier.slots} slot{tier.slots > 1 ? 's' : ''} available
                      </p>
                    )}

                    <div className="space-y-2 mb-6 py-4 border-y border-neutral-200">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={selectedTier?.id === tier.id ? 'primary' : 'outline'}
                      fullWidth
                      onClick={() => {
                        setSelectedTier(tier);
                        setShowProposalModal(true);
                      }}
                    >
                      {selectedTier?.id === tier.id ? 'Selected' : 'Select'} Tier
                    </Button>
                  </Card>
                ))}

                {/* Action Buttons */}
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate(`/messages?eventId=${eventId}`)}
                  icon={MessageSquare}
                >
                  Contact Organizer
                </Button>

                {isAuthenticated && user?.role === 'sponsor' && (
                  <Alert
                    type="info"
                    message="Ready to sponsor this event? Select a tier and submit your proposal."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Proposal Modal */}
          <Modal
            isOpen={showProposalModal}
            onClose={() => setShowProposalModal(false)}
            title={`Submit Proposal - ${selectedTier?.name}`}
            size="lg"
          >
            <form onSubmit={handleProposalSubmit} className="space-y-6">
              {/* Tier Summary */}
              <Card size="md" className="bg-primary-50 border-primary-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">
                      Sponsorship Package
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {selectedTier?.name}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(selectedTier?.price)}
                  </p>
                </div>
              </Card>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Proposal Message
                </label>
                <textarea
                  className="textarea"
                  placeholder="Tell the organizer why you're interested in sponsoring this event..."
                  rows="4"
                  value={proposal.message}
                  onChange={(e) =>
                    setProposal({ ...proposal, message: e.target.value })
                  }
                  required
                />
              </div>

              {/* Additional Requests */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Additional Requests (Optional)
                </label>
                <textarea
                  className="textarea"
                  placeholder="Any custom requirements or special requests..."
                  rows="3"
                  value={proposal.additionalRequests}
                  onChange={(e) =>
                    setProposal({ ...proposal, additionalRequests: e.target.value })
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowProposalModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  type="submit"
                  loading={proposalLoading}
                  disabled={proposalLoading}
                >
                  Submit Proposal {<ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </MainLayout>
  );
};

export default EventDetails;
