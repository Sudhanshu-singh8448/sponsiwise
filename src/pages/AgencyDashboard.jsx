import React, { useState } from 'react';
import { Plus, Users, TrendingUp, DollarSign, Calendar, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useBilling } from '../context/BillingContext';
import { formatCurrency, formatDate } from '../utils/helpers';

/**
 * AgencyDashboard - Multi-brand sponsor management
 * Features: Brand management, combined pipeline, earnings, team management
 */
export const AgencyDashboard = () => {
  const { user } = useAuth();
  const { proposals } = useMarketplace();
  const { transactions } = useBilling();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'TechCorp Sponsorships',
      type: 'sponsor',
      status: 'active',
      totalBudget: 500000,
      usedBudget: 245000,
      activeDeals: 8,
      createdDate: '2024-01-15',
      manager: 'Sarah Chen',
    },
    {
      id: 2,
      name: 'RetailMax Marketing',
      type: 'sponsor',
      status: 'active',
      totalBudget: 300000,
      usedBudget: 180000,
      activeDeals: 5,
      createdDate: '2024-03-20',
      manager: 'John Smith',
    },
    {
      id: 3,
      name: 'FinanceHub Events',
      type: 'sponsor',
      status: 'active',
      totalBudget: 250000,
      usedBudget: 125000,
      activeDeals: 3,
      createdDate: '2024-06-10',
      manager: 'Emily Rodriguez',
    },
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Account Manager',
      email: 'sarah@agency.com',
      brands: ['TechCorp Sponsorships'],
      status: 'active',
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Senior Account Manager',
      email: 'john@agency.com',
      brands: ['RetailMax Marketing', 'FinanceHub Events'],
      status: 'active',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Analyst',
      email: 'emily@agency.com',
      brands: ['All brands'],
      status: 'active',
    },
  ]);

  // Calculate metrics
  const totalBudget = brands.reduce((sum, b) => sum + b.totalBudget, 0);
  const usedBudget = brands.reduce((sum, b) => sum + b.usedBudget, 0);
  const budgetUtilization = ((usedBudget / totalBudget) * 100).toFixed(1);
  const totalActiveDeals = brands.reduce((sum, b) => sum + b.activeDeals, 0);
  const agencyEarnings = 125000;
  const renewalsDue = 3;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'brands', label: 'Manage Brands' },
    { id: 'pipeline', label: 'Combined Pipeline' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Agency Dashboard</h1>
              <p className="text-neutral-600">Manage all your sponsored brands in one place</p>
            </div>
            <button
              onClick={() => setShowAddBrand(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Total Budget</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">
                  {formatCurrency(totalBudget)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Budget Used</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">
                  {budgetUtilization}%
                </p>
                <p className="text-xs text-neutral-500 mt-1">{formatCurrency(usedBudget)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Active Deals</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{totalActiveDeals}</p>
                <p className="text-xs text-neutral-500 mt-1">Across all brands</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Agency Earnings</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">
                  {formatCurrency(agencyEarnings)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">This quarter</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-neutral-200 rounded-lg">
          <div className="border-b border-neutral-200 flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-primary-600'
                    : 'text-neutral-600 border-transparent hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Brand Summary</h3>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div
                        key={brand.id}
                        className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-neutral-900">{brand.name}</p>
                          <p className="text-sm text-neutral-500">
                            Manager: {brand.manager}
                          </p>
                        </div>
                        <div className="flex items-center gap-8 text-right">
                          <div>
                            <p className="text-sm text-neutral-600">Budget Used</p>
                            <p className="font-semibold text-neutral-900">
                              {((brand.usedBudget / brand.totalBudget) * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-600">Active Deals</p>
                            <p className="font-semibold text-neutral-900">{brand.activeDeals}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {brand.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Upcoming Renewals ({renewalsDue})
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-neutral-900">TechCorp Sponsorships</p>
                          <p className="text-sm text-neutral-500">Renewal in 7 days</p>
                        </div>
                      </div>
                      <button className="btn btn-sm btn-outline">Review</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-neutral-900">RetailMax Marketing</p>
                          <p className="text-sm text-neutral-500">Renewal in 14 days</p>
                        </div>
                      </div>
                      <button className="btn btn-sm btn-outline">Review</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Manage Brands Tab */}
            {activeTab === 'brands' && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">All Brands</h3>
                <div className="space-y-4">
                  {brands.map((brand) => (
                    <div
                      key={brand.id}
                      className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-neutral-900">{brand.name}</h4>
                          <p className="text-sm text-neutral-500">
                            Created {formatDate(brand.createdDate)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-outline">Edit</button>
                          <button className="btn btn-sm btn-secondary">Archive</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Total Budget</p>
                          <p className="font-semibold text-neutral-900">
                            {formatCurrency(brand.totalBudget)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Used</p>
                          <p className="font-semibold text-neutral-900">
                            {formatCurrency(brand.usedBudget)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Remaining</p>
                          <p className="font-semibold text-neutral-900">
                            {formatCurrency(brand.totalBudget - brand.usedBudget)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 bg-neutral-100 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${((brand.usedBudget / brand.totalBudget) * 100).toFixed(0)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline Tab */}
            {activeTab === 'pipeline' && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Combined Deal Pipeline
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700 font-medium mb-1">Pending</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium mb-1">Negotiating</p>
                      <p className="text-2xl font-bold text-orange-900">8</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700 font-medium mb-1">Accepted</p>
                      <p className="text-2xl font-bold text-green-900">{totalActiveDeals}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs text-purple-700 font-medium mb-1">Pipeline Value</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {formatCurrency(1250000)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">Top Opportunities</h4>
                    <div className="space-y-3">
                      {[
                        {
                          event: 'Tech Summit 2026',
                          brand: 'TechCorp Sponsorships',
                          amount: 150000,
                          status: 'Negotiating',
                        },
                        {
                          event: 'Retail Expo 2026',
                          brand: 'RetailMax Marketing',
                          amount: 120000,
                          status: 'Pending',
                        },
                        {
                          event: 'Finance Conference',
                          brand: 'FinanceHub Events',
                          amount: 100000,
                          status: 'Accepted',
                        },
                      ].map((opp, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-neutral-900">{opp.event}</p>
                            <p className="text-sm text-neutral-500">{opp.brand}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-neutral-900">
                              {formatCurrency(opp.amount)}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                opp.status === 'Accepted'
                                  ? 'bg-green-100 text-green-700'
                                  : opp.status === 'Negotiating'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {opp.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Team Members</h3>
                  <button className="btn btn-sm btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-neutral-900">{member.name}</h4>
                          <p className="text-sm text-neutral-600">{member.role}</p>
                          <p className="text-sm text-neutral-500">{member.email}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {member.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.brands.map((brand, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="btn btn-sm btn-outline">Edit</button>
                        <button className="btn btn-sm btn-secondary">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Brand Modal */}
      {showAddBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Add New Brand</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Annual Budget
                </label>
                <input
                  type="number"
                  placeholder="Enter annual budget"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Account Manager
                </label>
                <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Select manager...</option>
                  {teamMembers.map((member) => (
                    <option key={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddBrand(false)}
                className="flex-1 btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={() => setShowAddBrand(false)} className="flex-1 btn btn-primary">
                Add Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyDashboard;
