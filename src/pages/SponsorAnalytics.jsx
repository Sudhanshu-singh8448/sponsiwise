import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Eye, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Card, Tabs } from '../components/UI';
import { mockAnalytics } from '../data/mockData';
import { formatCurrency, formatNumber, calculateCPM } from '../utils/helpers';

/**
 * SponsorAnalytics - Analytics dashboard for sponsors
 * Shows spend, impressions, CPM, and ROI metrics
 */
export const SponsorAnalytics = () => {
  const { user } = useAuth();
  const { proposals } = useMarketplace();

  // Get sponsor's active proposals
  const myProposals = proposals.filter((p) => p.sponsorId === user?.id && p.status === 'accepted');

  // Mock time-series data
  const spendData = [
    { month: 'Jan', spend: 50000, proposals: 1 },
    { month: 'Feb', spend: 100000, proposals: 2 },
    { month: 'Mar', spend: 150000, proposals: 3 },
    { month: 'Apr', spend: 120000, proposals: 2 },
    { month: 'May', spend: 180000, proposals: 4 },
    { month: 'Jun', spend: 200000, proposals: 3 },
  ];

  const impressionsData = [
    { month: 'Jan', impressions: 125000, clicks: 5600 },
    { month: 'Feb', impressions: 240000, clicks: 11200 },
    { month: 'Mar', impressions: 380000, clicks: 16800 },
    { month: 'Apr', impressions: 320000, clicks: 14400 },
    { month: 'May', impressions: 460000, clicks: 19200 },
    { month: 'Jun', impressions: 520000, clicks: 23400 },
  ];

  const cpmData = [
    { event: 'TechConf 2025', cpm: 3.45, roi: 280 },
    { event: 'Sports Championship', cpm: 2.80, roi: 320 },
    { event: 'Music Festival', cpm: 4.20, roi: 220 },
    { event: 'Business Summit', cpm: 3.90, roi: 260 },
  ];

  const analytics = mockAnalytics.sponsorDashboard;

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
                  <p className="text-sm text-neutral-600 font-medium">Total Spend</p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {formatCurrency(analytics.totalInvestment)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Active Sponsorships
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {analytics.activeSponsorship}
                  </p>
                </div>
                <Target className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Estimated Reach
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {formatNumber(analytics.estimatedReach)}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Engagement Rate
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {analytics.engagementRate}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Active Sponsorships */}
          {myProposals.length > 0 && (
            <Card size="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Your Active Sponsorships
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Event
                      </th>
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Amount
                      </th>
                      <th className="text-left px-4 py-2 font-bold text-neutral-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProposals.slice(0, 5).map((p) => (
                      <tr key={p.id} className="border-b border-neutral-100">
                        <td className="px-4 py-2">{p.eventId}</td>
                        <td className="px-4 py-2 font-bold">
                          {formatCurrency(p.sponsorshipAmount)}
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      label: 'Spend Trends',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Monthly Sponsorship Spend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendData}>
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
                dataKey="spend"
                stroke="#1f2937"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ),
    },
    {
      label: 'Impressions & Clicks',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Campaign Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impressionsData}>
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
              <Bar dataKey="impressions" fill="#2563eb" />
              <Bar dataKey="clicks" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      ),
    },
    {
      label: 'CPM Analysis',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Cost Per Thousand Impressions by Event
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-bold text-neutral-900">
                    Event
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-neutral-900">
                    CPM
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-neutral-900">
                    ROI
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-neutral-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {cpmData.map((event, i) => (
                  <tr key={i} className="border-b border-neutral-100">
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {event.event}
                    </td>
                    <td className="px-4 py-3 font-bold text-neutral-900">
                      ${event.cpm.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      {event.roi}%
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Excellent
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            Sponsorship Analytics
          </h1>
          <p className="text-neutral-600">
            Track your sponsorship investments and measure ROI across events
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default SponsorAnalytics;
