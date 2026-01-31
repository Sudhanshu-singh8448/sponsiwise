import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Button } from '../components/FormElements';
import { Card, Badge } from '../components/UI';
import toast from 'react-hot-toast';

/**
 * PricingPlans - Subscription plans for Sponsors and Agencies
 * Shows feature comparison and upgrade CTAs
 */
export const PricingPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPlans, getSubscription, upgradeSubscription } = useBilling();
  const plans = getPlans();
  const userSubscription = user ? getSubscription(user.id) : null;

  const [loading, setLoading] = React.useState(null);

  const handleUpgrade = async (planId) => {
    if (!user) {
      toast.error('Please log in to upgrade your plan');
      navigate('/login');
      return;
    }

    setLoading(planId);
    try {
      await upgradeSubscription(user.id, planId);
      toast.success(`Successfully upgraded to ${getPlans().find(p => p.id === planId)?.name} plan!`);
    } catch (err) {
      toast.error('Failed to upgrade plan');
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const currentPlanId = userSubscription?.planId;

  return (
    <MainLayout>
      <div className="container-custom py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose the perfect plan for your sponsorship needs. Scale as you grow.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlanId === plan.id;
            const isMostPopular = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`relative transition-transform hover:scale-105 ${
                  isMostPopular ? 'md:scale-105' : ''
                }`}
              >
                {/* Most Popular Badge */}
                {isMostPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}

                <Card
                  size="lg"
                  className={`h-full flex flex-col ${
                    isMostPopular
                      ? 'border-2 border-primary-600 shadow-lg'
                      : 'border border-neutral-200'
                  }`}
                >
                  <div className="flex-1">
                    {/* Plan Header */}
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      {plan.name}
                    </h2>
                    <p className="text-sm text-neutral-600 mb-6 h-10">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      {typeof plan.price === 'number' ? (
                        <>
                          <span className="text-5xl font-bold text-neutral-900">
                            ${plan.price}
                          </span>
                          <span className="text-neutral-600 ml-2">
                            /{plan.billing}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-neutral-900">
                          {plan.price}
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-neutral-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6 border-t border-neutral-200">
                    {isCurrentPlan ? (
                      <div className="w-full py-2 text-center">
                        <Badge variant="success">Current Plan</Badge>
                      </div>
                    ) : (
                      <Button
                        variant={isMostPopular ? 'primary' : 'secondary'}
                        onClick={() => handleUpgrade(plan.id)}
                        loading={loading === plan.id}
                        className="w-full"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for Enterprise plans.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 14-day money-back guarantee on annual plans if you\'re not satisfied.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Growth and Enterprise plans include a 14-day free trial. No credit card required.',
              },
              {
                q: 'Can I add more users to my plan?',
                a: 'Yes, Enterprise plans include unlimited team members. Growth plans include up to 5 team members.',
              },
            ].map((item, index) => (
              <Card key={index} size="lg">
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">{item.q}</h3>
                  <p className="text-neutral-600">{item.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to scale your sponsorship program?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of sponsors and event organizers who use SponsiWise to
            manage their sponsorship deals efficiently.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/marketplace')}
            size="lg"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default PricingPlans;
