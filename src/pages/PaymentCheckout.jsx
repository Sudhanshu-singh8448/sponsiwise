import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Button, Input } from '../components/FormElements';
import { Card, Modal } from '../components/UI';
import toast from 'react-hot-toast';
import {
  formatCurrency,
  calculateDealValue,
} from '../utils/helpers';

/**
 * PaymentCheckout - Mock payment checkout flow
 * Shows proposal details, payment breakdown, and processes payment
 */
export const PaymentCheckout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getProposalById, events } = useMarketplace();
  const { processPayment } = useBilling();

  const proposalId = searchParams.get('proposal');
  const proposal = proposalId ? getProposalById(proposalId) : null;
  const event = proposal ? events.find((e) => e.id === proposal.eventId) : null;

  const [step, setStep] = useState(1); // 1: Review, 2: Payment Details, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // Validation
  const isCardDetailsValid =
    cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
    cardDetails.cardHolder.trim().length > 0 &&
    cardDetails.expiryDate.match(/^\d{2}\/\d{2}$/) &&
    cardDetails.cvv.length === 3;

  if (!proposal || !event) {
    return (
      <MainLayout>
        <div className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Proposal not found
            </h2>
            <Button onClick={() => navigate('/deals')} className="mt-4">
              Back to Deals
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { commission, organizerReceives } = calculateDealValue(
    proposal.sponsorshipAmount
  );

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!isCardDetailsValid) {
      toast.error('Please enter valid card details');
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, this would call a real payment processor
      // For now, we just show success
      setShowSuccessModal(true);
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      const formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      setCardDetails({ ...cardDetails, expiryDate: formatted });
    } else {
      setCardDetails({ ...cardDetails, expiryDate: value });
    }
  };

  // Step 1: Review
  const ReviewStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card size="lg">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Order Summary</h3>

        <div className="space-y-4">
          <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
            <div>
              <p className="font-bold text-neutral-900">{event.name}</p>
              <p className="text-sm text-neutral-600 mt-1">
                {event.location} • {event.date}
              </p>
            </div>
            <p className="font-bold text-neutral-900">
              {formatCurrency(proposal.sponsorshipAmount)}
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-neutral-700">Sponsorship Amount</p>
              <p className="font-bold text-neutral-900">
                {formatCurrency(proposal.sponsorshipAmount)}
              </p>
            </div>
            <div className="flex items-center justify-between text-orange-600">
              <p>Platform Fee (15%)</p>
              <p className="font-bold">-{formatCurrency(commission)}</p>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
              <p className="font-bold text-neutral-900">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(proposal.sponsorshipAmount)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Breakdown Card */}
      <Card size="lg">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">
          Payment Breakdown
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">Your payment</p>
            <p className="font-bold text-neutral-900">
              {formatCurrency(proposal.sponsorshipAmount)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">Platform commission</p>
            <p className="font-bold text-neutral-900">
              {formatCurrency(commission)} (15%)
            </p>
          </div>
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
            <p className="text-neutral-700">Organizer receives</p>
            <p className="font-bold text-green-600">
              {formatCurrency(organizerReceives)}
            </p>
          </div>
        </div>
      </Card>

      {/* Terms */}
      <Card size="lg">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            className="mt-1 w-4 h-4"
            defaultChecked
          />
          <label htmlFor="agree" className="text-neutral-700">
            I agree to the sponsorship terms and SponsiWise platform policies
          </label>
        </div>
      </Card>

      {/* Next Button */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => navigate(`/deal/${proposal.id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => setStep(2)}
          className="flex-1"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  // Step 2: Payment Details
  const PaymentStep = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      {/* Card Details */}
      <Card size="lg">
        <h3 className="text-lg font-bold text-neutral-900 mb-6">
          Payment Details
        </h3>

        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          {/* Card Holder */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.cardHolder}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardHolder: e.target.value })
              }
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                CVV
              </label>
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cvv: e.target.value.slice(0, 3),
                  })
                }
                placeholder="123"
                maxLength="3"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">
            Your payment information is encrypted and secure. This is a demo
            platform - no real charges will be made.
          </p>
        </div>
      </Card>

      {/* Order Total */}
      <Card size="lg" className="bg-neutral-50">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-neutral-900">Total Amount</p>
          <p className="text-2xl font-bold text-primary-600">
            {formatCurrency(proposal.sponsorshipAmount)}
          </p>
        </div>
      </Card>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep(1)}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isCardDetailsValid}
          loading={loading}
          className="flex-1"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );

  // Step 3: Success
  const SuccessStep = () => (
    <div className="text-center py-12 space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-neutral-600">
          Your sponsorship proposal has been confirmed
        </p>
      </div>

      <Card size="lg" className="bg-green-50 border border-green-200">
        <div className="space-y-2">
          <p className="text-sm text-neutral-600">Transaction Details</p>
          <p className="font-bold text-neutral-900">
            Reference: TXN-{Date.now()}
          </p>
          <div className="pt-2 border-t border-green-200">
            <p className="text-lg text-green-600 font-bold">
              {formatCurrency(proposal.sponsorshipAmount)} Charged
            </p>
          </div>
        </div>
      </Card>

      <p className="text-neutral-600 text-sm">
        A confirmation email has been sent to {user?.email}
      </p>

      <div className="space-y-2">
        <Button
          variant="primary"
          onClick={() => navigate(`/deal/${proposal.id}`)}
          className="w-full"
        >
          View Deal Details
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/billing')}
          className="w-full"
        >
          View Billing
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() =>
              step === 1 ? navigate(`/deal/${proposal.id}`) : setStep(step - 1)
            }
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            {step === 1 ? 'Review Order' : step === 2 ? 'Payment Details' : 'Confirmation'}
          </h1>

          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && <ReviewStep />}
            {step === 2 && <PaymentStep />}
            {showSuccessModal && <SuccessStep />}
          </div>

          {/* Sidebar - Order Summary */}
          <div>
            <Card size="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Order</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Event</p>
                  <p className="text-neutral-900 font-bold mt-1">{event.name}</p>
                  <p className="text-sm text-neutral-600 mt-1">{event.location}</p>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 font-medium">Amount</p>
                  <p className="text-2xl font-bold text-neutral-900 mt-1">
                    {formatCurrency(proposal.sponsorshipAmount)}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 font-medium">
                    Platform Fee
                  </p>
                  <p className="text-neutral-900 font-bold mt-1">
                    -{formatCurrency(commission)}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 font-medium">
                    Organizer Receives
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {formatCurrency(organizerReceives)}
                  </p>
                </div>
              </div>
            </Card>

            {step === 2 && (
              <Card size="lg" className="mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Demo Mode:</strong> Use any card details to test
                    the checkout flow.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentCheckout;
