import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  mockTransactions,
  mockInvoices,
  pricingPlans,
  mockSubscriptions,
  adminSettings,
} from '../data/mockData';
import { generateInvoiceNumber, calculateDealValue } from '../utils/helpers';

/**
 * BillingContext - Manages billing, transactions, invoices, and subscriptions
 */
const BillingContext = createContext();

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within BillingProvider');
  }
  return context;
};

export const BillingProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get all transactions
   */
  const getTransactions = useCallback(
    (filter = {}) => {
      let filtered = transactions;

      if (filter.userId) {
        filtered = filtered.filter(
          (t) => t.sponsorId === filter.userId || t.organizerId === filter.userId
        );
      }

      if (filter.type) {
        filtered = filtered.filter((t) => t.type === filter.type);
      }

      if (filter.status) {
        filtered = filtered.filter((t) => t.status === filter.status);
      }

      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    [transactions]
  );

  /**
   * Get invoices
   */
  const getInvoices = useCallback(
    (filter = {}) => {
      let filtered = invoices;

      if (filter.userId) {
        filtered = filtered.filter(
          (i) => i.sponsorId === filter.userId || i.organizerId === filter.userId
        );
      }

      if (filter.status) {
        filtered = filtered.filter((i) => i.status === filter.status);
      }

      return filtered.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
    },
    [invoices]
  );

  /**
   * Get invoice by ID
   */
  const getInvoiceById = useCallback(
    (invoiceId) => {
      return invoices.find((i) => i.id === invoiceId);
    },
    [invoices]
  );

  /**
   * Create transaction from accepted proposal
   */
  const createTransaction = useCallback(async (proposal, sponsorId, organizerId) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { commission, organizerReceives } = calculateDealValue(
        proposal.sponsorshipAmount,
        adminSettings.defaultCommissionRate
      );

      const newTransaction = {
        id: `txn-${Date.now()}`,
        type: 'payment',
        proposalId: proposal.id,
        sponsorId,
        organizerId,
        amount: proposal.sponsorshipAmount,
        currency: proposal.currency,
        commission,
        organizerReceives,
        status: 'completed',
        paymentMethod: 'credit_card',
        createdAt: new Date().toISOString().split('T')[0],
        completedAt: new Date().toISOString().split('T')[0],
      };

      setTransactions((prev) => [...prev, newTransaction]);
      return newTransaction;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create invoice
   */
  const createInvoice = useCallback(async (proposal, sponsorId, organizerId) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { commission, organizerReceives } = calculateDealValue(
        proposal.sponsorshipAmount,
        adminSettings.defaultCommissionRate
      );

      const newInvoice = {
        id: `inv-${Date.now()}`,
        number: generateInvoiceNumber(),
        type: 'sponsorship',
        proposalId: proposal.id,
        sponsorId,
        organizerId,
        amount: proposal.sponsorshipAmount,
        commission,
        organizerReceives,
        currency: proposal.currency,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        status: 'unpaid',
        items: [
          {
            description: `Sponsorship - ${proposal.eventId}`,
            quantity: 1,
            unitPrice: proposal.sponsorshipAmount,
            total: proposal.sponsorshipAmount,
          },
        ],
      };

      setInvoices((prev) => [...prev, newInvoice]);
      return newInvoice;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Process payment for invoice
   */
  const processPayment = useCallback(async (invoiceId) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setInvoices((prev) =>
        prev.map((i) =>
          i.id === invoiceId ? { ...i, status: 'paid' } : i
        )
      );

      // Also create a payout transaction for organizer
      const invoice = invoices.find((i) => i.id === invoiceId);
      if (invoice) {
        const payout = {
          id: `txn-payout-${Date.now()}`,
          type: 'payout',
          proposalId: invoice.proposalId,
          organizerId: invoice.organizerId,
          amount: invoice.organizerReceives,
          currency: invoice.currency,
          status: 'completed',
          payoutMethod: 'bank_transfer',
          createdAt: new Date().toISOString().split('T')[0],
          completedAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        };
        setTransactions((prev) => [...prev, payout]);
      }

      return getInvoiceById(invoiceId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [invoices, getInvoiceById]);

  /**
   * Get all pricing plans
   */
  const getPlans = useCallback(() => {
    return pricingPlans;
  }, []);

  /**
   * Get plan by ID
   */
  const getPlanById = useCallback((planId) => {
    return pricingPlans.find((p) => p.id === planId);
  }, []);

  /**
   * Get user subscription
   */
  const getSubscription = useCallback(
    (userId) => {
      return subscriptions[userId] || null;
    },
    [subscriptions]
  );

  /**
   * Upgrade subscription
   */
  const upgradeSubscription = useCallback(async (userId, newPlanId) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newSubscription = {
        userId,
        planId: newPlanId,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        autoRenew: true,
        monthlyBilled: true,
      };

      setSubscriptions((prev) => ({
        ...prev,
        [userId]: newSubscription,
      }));

      return newSubscription;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get commission settings
   */
  const getCommissionSettings = useCallback(() => {
    return adminSettings;
  }, []);

  /**
   * Update commission rate (admin only)
   */
  const updateCommissionRate = useCallback(async (newRate) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (newRate < 0 || newRate > 1) {
        throw new Error('Commission rate must be between 0 and 1');
      }

      // In production, this would persist to backend
      adminSettings.defaultCommissionRate = newRate;
      return adminSettings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Calculate billing summary for user
   */
  const getBillingSummary = useCallback(
    (userId, role) => {
      const userTransactions = getTransactions({ userId });
      const userInvoices = getInvoices({ userId });

      let summary = {
        totalAmount: 0,
        paidAmount: 0,
        pendingAmount: 0,
        transactionCount: userTransactions.length,
        invoiceCount: userInvoices.length,
      };

      if (role === 'sponsor') {
        // Sponsors: payments they've made
        const payments = userTransactions.filter((t) => t.type === 'payment');
        summary.totalAmount = payments.reduce((sum, t) => sum + t.amount, 0);
        summary.paidAmount = payments
          .filter((t) => t.status === 'completed')
          .reduce((sum, t) => sum + t.amount, 0);
        summary.pendingAmount = userInvoices
          .filter((i) => i.status === 'unpaid')
          .reduce((sum, i) => sum + i.amount, 0);
      } else if (role === 'organizer') {
        // Organizers: payouts they'll receive
        const payouts = userTransactions.filter((t) => t.type === 'payout');
        summary.totalAmount = payouts.reduce((sum, t) => sum + t.amount, 0);
        summary.paidAmount = payouts
          .filter((t) => t.status === 'completed')
          .reduce((sum, t) => sum + t.amount, 0);
        summary.pendingAmount = payouts
          .filter((t) => t.status !== 'completed')
          .reduce((sum, t) => sum + t.amount, 0);
      }

      return summary;
    },
    [getTransactions, getInvoices]
  );

  const value = {
    transactions,
    invoices,
    subscriptions,
    loading,
    error,
    getTransactions,
    getInvoices,
    getInvoiceById,
    createTransaction,
    createInvoice,
    processPayment,
    getPlans,
    getPlanById,
    getSubscription,
    upgradeSubscription,
    getCommissionSettings,
    updateCommissionRate,
    getBillingSummary,
  };

  return (
    <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
  );
};

export default BillingContext;
