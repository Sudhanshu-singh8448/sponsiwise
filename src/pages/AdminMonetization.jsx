import React, { useState } from 'react';
import { DollarSign, Settings, BarChart3, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Button, Input } from '../components/FormElements';
import { Card, Badge, Tabs } from '../components/UI';
import toast from 'react-hot-toast';
import { pricingPlans, adminSettings } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

/**
 * AdminMonetization - Admin platform for managing monetization
 * Commission rates, plan management, revenue overview
 */
export const AdminMonetization = () => {
  const { user } = useAuth();
  const { getCommissionSettings, updateCommissionRate } = useBilling();

  // Only admins can access
  if (user?.role !== 'admin') {
    return (
      <MainLayout>
        <div className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Access Denied
            </h2>
            <p className="text-neutral-600">Only admins can access monetization settings</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const [commissionRate, setCommissionRate] = useState(
    adminSettings.defaultCommissionRate * 100
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateCommissionRate = async () => {
    if (commissionRate < 0 || commissionRate > 100) {
      toast.error('Commission rate must be between 0 and 100%');
      return;
    }

    setLoading(true);
    try {
      await updateCommissionRate(commissionRate / 100);
      toast.success('Commission rate updated');
    } catch (err) {
      toast.error('Failed to update commission rate');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      label: 'Commission Settings',
      content: (
        <div className="space-y-6">
          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">
              Platform Commission Rate
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Commission Rate (%)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                  <span className="text-2xl font-bold text-neutral-900">%</span>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Currently: <strong>{commissionRate.toFixed(2)}%</strong> of
                  every sponsorship amount
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> If a sponsor pays $100,000 at{' '}
                  {commissionRate.toFixed(2)}% commission:
                </p>
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    • SponsiWise receives:{' '}
                    <strong className="text-blue-900">
                      ${(100000 * (commissionRate / 100)).toFixed(0)}
                    </strong>
                  </p>
                  <p>
                    • Organizer receives:{' '}
                    <strong className="text-blue-900">
                      ${(100000 * (1 - commissionRate / 100)).toFixed(0)}
                    </strong>
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleUpdateCommissionRate}
                loading={loading}
                className="w-full"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Update Commission Rate
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: 'Subscription Plans',
      content: (
        <div className="space-y-4">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} size="lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Plan Name</p>
                  <p className="text-lg font-bold text-neutral-900">{plan.name}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Price</p>
                  <p className="text-lg font-bold text-neutral-900">
                    {typeof plan.price === 'number'
                      ? `$${plan.price}/${plan.billing}`
                      : plan.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Status</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Actions</p>
                  <Button variant="secondary" size="sm" className="w-full mt-1">
                    Configure
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-600 font-medium mb-2">
                  Features
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plan.features.slice(0, 4).map((feature, i) => (
                    <p key={i} className="text-sm text-neutral-700">
                      ✓ {feature}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      label: 'Revenue Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Monthly Commission
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    $53,000
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Paid to Organizers
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">
                    $298,000
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600 opacity-20" />
              </div>
            </Card>

            <Card size="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">
                    Active Deals
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">88</p>
                </div>
                <Settings className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>
          </div>

          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Revenue by Plan
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <p className="font-bold text-neutral-900">Starter Plan</p>
                  <p className="text-sm text-neutral-600">Free tier</p>
                </div>
                <p className="font-bold text-neutral-900">$0</p>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <p className="font-bold text-neutral-900">Growth Plan</p>
                  <p className="text-sm text-neutral-600">$99/month</p>
                </div>
                <p className="font-bold text-green-600">$4,950</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900">Enterprise Plan</p>
                  <p className="text-sm text-neutral-600">Custom pricing</p>
                </div>
                <p className="font-bold text-green-600">$48,050</p>
              </div>
            </div>
          </Card>

          <Card size="lg">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Month-over-Month Growth
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-neutral-700">April → May</p>
                <p className="font-bold text-green-600">+33.3%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-neutral-700">May → June</p>
                <p className="font-bold text-green-600">+29.2%</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Monetization Settings
          </h1>
          <p className="text-neutral-600">
            Configure commission rates, subscription plans, and revenue settings
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default AdminMonetization;
