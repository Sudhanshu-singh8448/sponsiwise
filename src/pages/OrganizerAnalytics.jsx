import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Target, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Card, Tabs } from '../components/UI';
import { mockAnalytics } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/helpers';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

/**
 * OrganizerAnalytics - Analytics dashboard for event organizers
 * Shows revenue, deal conversion, top events, and sponsorship metrics
 */
export const OrganizerAnalytics = () => {
  const { user } = useAuth();
  const { proposals, events } = useMarketplace();

  // Get organizer's events and proposals
  const myEvents = events.filter((e) => e.organizerId === user?.id);
  const myProposals = proposals.filter((p) =>
    myEvents.map((e) => e.id).includes(p.eventId)
  );

  // Mock data
  const revenueData = [
    { month: 'Jan', revenue: 80000, deals: 3 },
    { month: 'Feb', revenue: 160000, deals: 5 },
    { month: 'Mar', revenue: 200000, deals: 6 },
    { month: 'Apr', revenue: 180000, deals: 5 },
    { month: 'May', revenue: 240000, deals: 7 },
    { month: 'Jun', revenue: 280000, deals: 8 },
  ];

  const conversionData = [
    { name: 'Completed', value: 18, fill: '#10b981' },
    { name: 'Negotiating', value: 8, fill: '#f59e0b' },
    { name: 'Pending', value: 14, fill: '#2563eb' },
    { name: 'Rejected', value: 5, fill: '#ef4444' },
  ];

  const topEvents = [
    { name: 'TechConf 2025', revenue: 150000, deals: 3 },
    { name: 'Sports Championship', revenue: 280000, deals: 5 },
    { name: 'Music Festival', revenue: 120000, deals: 2 },
  ];

  const analytics = mockAnalytics.organizerDashboard;

  // Calculate metrics
  const totalRevenue = myProposals
    .filter((p) => p.status === 'accepted')
    .reduce((sum, p) => sum + p.sponsorshipAmount, 0);

  const conversionRate =
    myProposals.length > 0
      ? Math.round(
          (myProposals.filter((p) => p.status === 'accepted').length /
            myProposals.length) *
            100
        )
      : 0;

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {formatCurrency(totalRevenue || analytics.totalRevenue)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Active Events</p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {myEvents.length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Active Deals</p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {analytics.activeSponsorship}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {conversionRate}%
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Events Summary */}
          {myEvents.length > 0 && (
            <Card size="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Your Events
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Event Name
                      </th>
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Date
                      </th>
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Active Proposals
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEvents.map((event) => {
                      const eventProposals = myProposals.filter(
                        (p) => p.eventId === event.id
                      );
                      return (
                        <tr key={event.id} className="border-b border-neutral-100">
                          <td className="px-4 py-2 font-medium">{event.name}</td>
                          <td className="px-4 py-2">{event.date}</td>
                          <td className="px-4 py-2 font-bold">
                            {eventProposals.length}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      label: 'Revenue Trends',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Monthly Revenue & Deals
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ),
    },
    {
      label: 'Deal Conversion',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">
              Proposal Status Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Status Summary
            </h3>
            <div className="space-y-4">
              {conversionData.map((item, i) => {
                const count = myProposals.filter((p) => {
                  if (item.name === 'Completed') return p.status === 'accepted';
                  if (item.name === 'Negotiating')
                    return p.status === 'negotiating';
                  if (item.name === 'Pending') return p.status === 'pending';
                  if (item.name === 'Rejected') return p.status === 'rejected';
                  return false;
                }).length;

                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <p className="text-neutral-700">{item.name}</p>
                    </div>
                    <p className="font-bold text-neutral-900">{count}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: 'Top Events',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Top Events by Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topEvents}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" />
              <Bar dataKey="deals" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Event Analytics
          </h1>
          <p className="text-neutral-600">
            Track your event sponsorship revenue and deal conversion metrics
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default OrganizerAnalytics;
