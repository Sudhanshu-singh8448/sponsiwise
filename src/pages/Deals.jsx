import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Button, Input, Select } from '../components/FormElements';
import { Card, Badge } from '../components/UI';
import { formatCurrency, getStatusLabel, getStatusColor } from '../utils/helpers';

/**
 * Deals - Manages proposals and sponsorship deals
 * Role-aware view: Sponsors see their proposals, Organizers see proposals for their events
 */
export const Deals = () => {
  const { user } = useAuth();
  const { proposals, events, loading } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter proposals based on user role
  const filterProposalsByRole = useMemo(() => {
    let filtered = proposals;

    if (user?.role === 'sponsor') {
      // Sponsors see their proposals
      filtered = filtered.filter((p) => p.sponsorId === user.id);
    } else if (user?.role === 'organizer') {
      // Organizers see proposals for their events
      const myEventIds = events
        .filter((e) => e.organizerId === user.id)
        .map((e) => e.id);
      filtered = filtered.filter((p) => myEventIds.includes(p.eventId));
    } else if (user?.role === 'admin') {
      // Admins see all proposals
      filtered = proposals;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const event = events.find((e) => e.id === p.eventId);
        const eventName = event?.name.toLowerCase() || '';
        return eventName.includes(searchQuery.toLowerCase());
      });
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    return filtered.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [proposals, events, user, searchQuery, selectedStatus]);

  // Get status breakdown for user
  const statusBreakdown = useMemo(() => {
    const breakdown = {
      pending: 0,
      reviewing: 0,
      negotiating: 0,
      accepted: 0,
      rejected: 0,
    };

    filterProposalsByRole.forEach((p) => {
      if (breakdown.hasOwnProperty(p.status)) {
        breakdown[p.status]++;
      }
    });

    return breakdown;
  }, [filterProposalsByRole]);

  // Sidebar Component
  const Sidebar = () => (
    <div className="p-6 space-y-6">
      <h3 className="font-bold text-lg text-neutral-900">Filters</h3>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Deal Status
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedStatus('')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
              !selectedStatus
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            All Statuses
          </button>
          {Object.entries(statusBreakdown).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                selectedStatus === status
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>{getStatusLabel(status)}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  selectedStatus === status
                    ? 'bg-primary-200'
                    : 'bg-neutral-200'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="pt-6 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          {user?.role === 'sponsor'
            ? 'Showing all your sponsorship proposals'
            : user?.role === 'organizer'
            ? 'Showing proposals for your events'
            : 'Showing all platform deals'}
        </p>
      </div>
    </div>
  );

  // Deal Card Component
  const DealCard = ({ proposal }) => {
    const event = events.find((e) => e.id === proposal.eventId);
    const tier = event?.sponsorshipTiers.find((t) => t.id === proposal.tierId);

    const getStatusIcon = (status) => {
      switch (status) {
        case 'accepted':
          return <CheckCircle className="w-4 h-4 text-green-600" />;
        case 'negotiating':
          return <TrendingUp className="w-4 h-4 text-blue-600" />;
        case 'rejected':
          return <AlertCircle className="w-4 h-4 text-red-600" />;
        default:
          return <Clock className="w-4 h-4 text-orange-600" />;
      }
    };

    return (
      <Link to={`/deal/${proposal.id}`}>
        <Card size="lg" className="hover:shadow-md transition-shadow cursor-pointer">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {event?.name || 'Unknown Event'}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {tier?.name} • {event?.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(proposal.status)}
                <Badge variant={getStatusColor(proposal.status)}>
                  {getStatusLabel(proposal.status)}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-neutral-200">
              <div>
                <p className="text-xs text-neutral-600 font-medium">Amount</p>
                <p className="text-lg font-bold text-neutral-900 mt-1">
                  {formatCurrency(proposal.sponsorshipAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 font-medium">Created</p>
                <p className="text-sm text-neutral-900 mt-1">{proposal.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 font-medium">Updated</p>
                <p className="text-sm text-neutral-900 mt-1">{proposal.updatedAt}</p>
              </div>
            </div>

            {/* Message */}
            {proposal.proposal?.message && (
              <p className="text-sm text-neutral-600 line-clamp-2">
                {proposal.proposal.message}
              </p>
            )}

            {/* CTA */}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1">
                View Deal
              </Button>
              {user?.role === 'organizer' && proposal.status === 'pending' && (
                <Button variant="secondary" size="sm" className="flex-1">
                  Review
                </Button>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Sponsorship Deals
          </h1>
          <p className="text-neutral-600">
            Manage and track all your sponsorship proposals and negotiations
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-4 mb-8">
          <Input
            placeholder="Search by event name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters
                ? 'bg-primary-100 text-primary-600'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <Card size="lg">
                <Sidebar />
              </Card>
            </div>
          )}

          {/* Deal List */}
          <div className={`space-y-4 ${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {filterProposalsByRole.length === 0 ? (
              <Card size="lg" className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">No deals found</p>
                {user?.role === 'sponsor' && (
                  <Link to="/marketplace">
                    <Button variant="primary">Browse Events</Button>
                  </Link>
                )}
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-neutral-600 font-medium">
                    Showing {filterProposalsByRole.length} deal
                    {filterProposalsByRole.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {filterProposalsByRole.map((proposal) => (
                  <DealCard key={proposal.id} proposal={proposal} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Deals;
