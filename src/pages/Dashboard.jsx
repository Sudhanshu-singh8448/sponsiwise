import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Card, Badge, Button } from '../components';
import { mockAnalytics } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/helpers';

/**
 * Dashboard - Role-specific dashboard
 */
export const Dashboard = () => {
  const { user } = useAuth();
  const { events, proposals } = useMarketplace();

  if (!user) return null;

  // Sponsor Dashboard
  if (user.role === 'sponsor') {
    const analytics = mockAnalytics.sponsorDashboard;
    const myProposals = proposals.filter((p) => p.sponsorId === user.id);

    return (
      <MainLayout>
        <div className="container-custom py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              Welcome, {user.companyName}!
            </h1>
            <p className="text-neutral-600">
              Manage your sponsorships and track ROI across all events.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'Active Sponsorships',
                value: analytics.activeSponsorship,
                icon: Calendar,
              },
              {
                label: 'Total Investment',
                value: formatCurrency(analytics.totalInvestment),
                icon: DollarSign,
              },
              {
                label: 'Estimated Reach',
                value: formatNumber(analytics.estimatedReach),
                icon: Users,
              },
              {
                label: 'Engagement Rate',
                value: `${analytics.engagementRate}%`,
                icon: TrendingUp,
              },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <Card key={i} size="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {metric.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-primary-600 opacity-20" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Proposals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Deals */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Recent Proposals</h2>
                <Link to="/marketplace" className="text-primary-600 hover:text-primary-700">
                  View All
                </Link>
              </div>

              {myProposals.length === 0 ? (
                <Card size="lg" className="text-center py-8">
                  <p className="text-neutral-600 mb-4">
                    No proposals yet. Start exploring events!
                  </p>
                  <Link to="/marketplace">
                    <Button variant="primary">Browse Events</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {myProposals.slice(0, 5).map((proposal) => {
                    const event = events.find((e) => e.id === proposal.eventId);
                    return (
                      <Card key={proposal.id} size="md">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-900">
                              {event?.name}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {proposal.proposal?.message}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              proposal.status === 'accepted' ? 'success' :
                              proposal.status === 'rejected' ? 'error' :
                              'warning'
                            }>
                              {proposal.status}
                            </Badge>
                            <p className="text-sm font-semibold text-neutral-900 mt-2">
                              {formatCurrency(proposal.sponsorshipAmount)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/marketplace">
                  <Button variant="primary" fullWidth>
                    Browse Events
                  </Button>
                </Link>
                <Link to="/deals">
                  <Button variant="secondary" fullWidth>
                    View All Deals
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" fullWidth>
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Organizer Dashboard
  if (user.role === 'organizer') {
    const analytics = mockAnalytics.organizerDashboard;
    const myEvents = events.filter((e) => e.organizerId === user.id);

    return (
      <MainLayout>
        <div className="container-custom py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              Welcome, {user.organizationName}!
            </h1>
            <p className="text-neutral-600">Manage your events and sponsorships.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'Total Events',
                value: analytics.totalEvents,
                icon: Calendar,
              },
              {
                label: 'Active Sponsorships',
                value: analytics.activeSponsorship,
                icon: Users,
              },
              {
                label: 'Total Revenue',
                value: formatCurrency(analytics.totalRevenue),
                icon: DollarSign,
              },
              {
                label: 'Sponsor Engagement',
                value: `${analytics.sponsorEngagement}%`,
                icon: TrendingUp,
              },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <Card key={i} size="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {metric.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-primary-600 opacity-20" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Your Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Your Events</h2>
              <Link to="/create-event" className="text-primary-600 hover:text-primary-700">
                + Create Event
              </Link>
            </div>

            {myEvents.length === 0 ? (
              <Card size="lg" className="text-center py-8">
                <p className="text-neutral-600 mb-4">No events yet.</p>
                <Link to="/create-event">
                  <Button variant="primary">Create Your First Event</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <Card key={event.id} size="lg">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-bold text-neutral-900 mb-2">{event.name}</h4>
                    <p className="text-sm text-neutral-600 mb-4">{event.location}</p>
                    <Link to={`/event/${event.id}`}>
                      <Button variant="outline" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  // Admin Dashboard
  if (user.role === 'admin') {
    const analytics = mockAnalytics.adminDashboard;

    return (
      <MainLayout>
        <div className="container-custom py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">Platform overview and analytics.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'Total Users',
                value: analytics.totalUsers,
                icon: Users,
              },
              {
                label: 'Active Deals',
                value: analytics.activeDeals,
                icon: DollarSign,
              },
              {
                label: 'Platform Revenue',
                value: formatCurrency(analytics.platformRevenue),
                icon: TrendingUp,
              },
              {
                label: 'Growth Rate',
                value: `${analytics.growthRate}%`,
                icon: TrendingUp,
              },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <Card key={i} size="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {metric.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-primary-600 opacity-20" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card size="lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Management</h3>
              <div className="space-y-3">
                <Button variant="secondary" fullWidth>
                  Approve Users
                </Button>
                <Button variant="secondary" fullWidth>
                  Manage Disputes
                </Button>
                <Button variant="secondary" fullWidth>
                  View All Transactions
                </Button>
              </div>
            </Card>

            <Card size="lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <Button variant="secondary" fullWidth>
                  Commission Rates
                </Button>
                <Button variant="secondary" fullWidth>
                  Subscription Plans
                </Button>
                <Button variant="secondary" fullWidth>
                  Platform Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  return null;
};

export default Dashboard;
