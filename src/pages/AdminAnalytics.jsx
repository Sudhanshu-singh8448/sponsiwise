import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Card, Tabs } from '../components/UI';
import { mockAnalytics } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/helpers';

/**
 * AdminAnalytics - Platform-wide analytics for admins
 * Shows platform revenue, deal metrics, and growth trends
 */
export const AdminAnalytics = () => {
  const { proposals } = useMarketplace();
  const { getTransactions } = useBilling();
  const transactions = getTransactions();

  const analytics = mockAnalytics.adminDashboard;
  const platformStats = analytics.platformStats;

  // Calculate metrics
  const totalRevenue = transactions
    .filter((t) => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.commission, 0);

  const activeDeals = proposals.filter((p) => p.status === 'accepted').length;

  const averageDeadlineSize =
    proposals.length > 0
      ? Math.round(
          proposals.reduce((sum, p) => sum + p.sponsorshipAmount, 0) /
            proposals.length
        )
      : 0;

  // Mock growth data
  const growthData = [
    { month: 'Jan', users: 42, deals: 10, revenue: 50000 },
    { month: 'Feb', users: 68, deals: 25, revenue: 85000 },
    { month: 'Mar', users: 92, deals: 42, revenue: 135000 },
    { month: 'Apr', users: 115, deals: 58, revenue: 180000 },
    { month: 'May', users: 138, deals: 72, revenue: 240000 },
    { month: 'Jun', users: 165, deals: 88, revenue: 310000 },
  ];

  const dealStatusBreakdown = [
    {
      status: 'Completed',
      count: proposals.filter((p) => p.status === 'accepted').length,
    },
    {
      status: 'Negotiating',
      count: proposals.filter((p) => p.status === 'negotiating').length,
    },
    {
      status: 'Pending',
      count: proposals.filter((p) => p.status === 'pending').length,
    },
    {
      status: 'Rejected',
      count: proposals.filter((p) => p.status === 'rejected').length,
    },
  ];

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
                  <p className="text-sm text-neutral-600 font-medium">
                    Platform Revenue
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {formatCurrency(totalRevenue || analytics.platformRevenue)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Active Deals
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {activeDeals || analytics.activeDeals}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    {analytics.totalTransactions}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Growth Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {analytics.growthRate}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Deal Summary */}
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Deal Status Summary
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {dealStatusBreakdown.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">
                    {item.count}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">{item.status}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Metrics */}
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <p className="text-neutral-700">Average Deal Size</p>
                <p className="font-bold text-neutral-900">
                  {formatCurrency(averageDeadlineSize)}
                </p>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <p className="text-neutral-700">Total Proposals</p>
                <p className="font-bold text-neutral-900">{proposals.length}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-neutral-700">Platform Commission Rate</p>
                <p className="font-bold text-neutral-900">15%</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: 'Growth',
      content: (
        <div className="space-y-6">
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">
              Platform Growth Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">
              Users & Deals Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
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
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
                <Line
                  type="monotone"
                  dataKey="deals"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ),
    },
    {
      label: 'Revenue',
      content: (
        <Card size="lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Monthly Revenue & Commission
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformStats}>
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
              <Bar dataKey="revenue" fill="#2563eb" />
              <Bar dataKey="deals" fill="#10b981" />
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
            Platform Analytics
          </h1>
          <p className="text-neutral-600">
            Monitor platform performance, revenue, and growth metrics
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default AdminAnalytics;
