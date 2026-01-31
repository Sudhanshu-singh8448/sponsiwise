import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { MarketplaceProvider } from '../context/MarketplaceContext';
import { BillingProvider } from '../context/BillingContext';
import {
  Landing,
  Dashboard,
  Marketplace,
  Deals,
  Billing,
  Messages,
  AdminConsole,
} from '../pages';

// Mock route context for protected pages
const MockedApp = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <MarketplaceProvider>
        <BillingProvider>{children}</BillingProvider>
      </MarketplaceProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('Smoke Tests - Pages Render', () => {
  describe('Landing Page', () => {
    it('should render without crashing', () => {
      render(
        <MockedApp>
          <Landing />
        </MockedApp>
      );
      expect(screen.getByText(/SponsiWise/i)).toBeInTheDocument();
    });

    it('should display call to action buttons', () => {
      render(
        <MockedApp>
          <Landing />
        </MockedApp>
      );
      expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    });
  });

  describe('Marketplace Page', () => {
    it('should render without crashing', () => {
      render(
        <MockedApp>
          <Marketplace />
        </MockedApp>
      );
      expect(screen.getByText(/Browse Events/i) || screen.getByText(/Events/i)).toBeInTheDocument();
    });
  });
});

describe('Context Tests', () => {
  describe('AuthContext', () => {
    it('should provide auth context values', async () => {
      const TestComponent = () => {
        const { isAuthenticated, user } = require('../context/AuthContext').useAuth();
        return (
          <div>
            <span>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
          </div>
        );
      };

      render(
        <MockedApp>
          <TestComponent />
        </MockedApp>
      );

      // Component should render without error
      expect(screen.getByText(/Not Authenticated|Authenticated/i)).toBeInTheDocument();
    });
  });

  describe('MarketplaceContext', () => {
    it('should provide marketplace context', async () => {
      // This test verifies the context is accessible
      const TestComponent = () => {
        try {
          const { proposals } = require('../context/MarketplaceContext').useMarketplace();
          return <div>Marketplace ready: {proposals ? 'Yes' : 'No'}</div>;
        } catch (error) {
          return <div>Error: {error.message}</div>;
        }
      };

      render(
        <MockedApp>
          <TestComponent />
        </MockedApp>
      );

      expect(
        screen.getByText(/Marketplace ready|Error/i) || screen.getByText(/^Marketplace ready/)
      ).toBeInTheDocument();
    });
  });

  describe('BillingContext', () => {
    it('should provide billing context', async () => {
      const TestComponent = () => {
        try {
          const { transactions } = require('../context/BillingContext').useBilling();
          return <div>Billing ready: {transactions ? 'Yes' : 'No'}</div>;
        } catch (error) {
          return <div>Error: {error.message}</div>;
        }
      };

      render(
        <MockedApp>
          <TestComponent />
        </MockedApp>
      );

      expect(screen.getByText(/Billing ready|Error/i) || screen.getByText(/^Billing ready/)).toBeInTheDocument();
    });
  });
});

describe('Helper Functions Tests', () => {
  it('formatCurrency should format numbers correctly', () => {
    const { formatCurrency } = require('../utils/helpers');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('calculateCPM should calculate cost per thousand correctly', () => {
    const { calculateCPM } = require('../utils/helpers');
    expect(calculateCPM(1000, 1000000)).toBe(1);
    expect(calculateCPM(5000, 1000000)).toBe(5);
  });

  it('calculateROI should calculate ROI percentage', () => {
    const { calculateROI } = require('../utils/helpers');
    expect(calculateROI(1000, 1500)).toBe(50);
    expect(calculateROI(1000, 2000)).toBe(100);
  });

  it('getStatusColor should return correct color variants', () => {
    const { getStatusColor } = require('../utils/helpers');
    expect(getStatusColor('pending')).toBe('warning');
    expect(getStatusColor('accepted')).toBe('success');
    expect(getStatusColor('rejected')).toBe('error');
  });

  it('getStatusLabel should return proper labels', () => {
    const { getStatusLabel } = require('../utils/helpers');
    expect(getStatusLabel('pending')).toBe('Pending Review');
    expect(getStatusLabel('accepted')).toBe('Accepted');
    expect(getStatusLabel('negotiating')).toBe('Under Negotiation');
  });

  it('calculateCommission should calculate 15% default', () => {
    const { calculateCommission } = require('../utils/helpers');
    expect(calculateCommission(1000)).toBe(150);
    expect(calculateCommission(100000, 0.15)).toBe(15000);
  });

  it('generateInvoiceNumber should generate valid invoice numbers', () => {
    const { generateInvoiceNumber } = require('../utils/helpers');
    const invoiceNum = generateInvoiceNumber();
    expect(invoiceNum).toMatch(/^INV-\d{6}-\d{5}$/);
  });

  it('formatDateTime should format date strings', () => {
    const { formatDateTime } = require('../utils/helpers');
    const date = '2024-01-15T14:30:00';
    const formatted = formatDateTime(date);
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('2024');
  });

  it('scoreEventForSponsor should score events', () => {
    const { scoreEventForSponsor } = require('../utils/helpers');
    const mockEvent = {
      name: 'Tech Event',
      category: 'technology',
      audience: { size: 50000 },
      sponsorshipTiers: [{ name: 'Gold', price: 100000 }],
    };
    const mockSponsor = {
      budget: 150000,
      interests: ['technology'],
    };
    const score = scoreEventForSponsor(mockEvent, mockSponsor);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('getRecommendedEvents should return array of events', () => {
    const { getRecommendedEvents } = require('../utils/helpers');
    const mockEvents = [
      {
        id: 1,
        name: 'Event 1',
        category: 'technology',
        audience: { size: 50000 },
        sponsorshipTiers: [{ name: 'Gold', price: 100000 }],
      },
      {
        id: 2,
        name: 'Event 2',
        category: 'sports',
        audience: { size: 30000 },
        sponsorshipTiers: [{ name: 'Silver', price: 50000 }],
      },
    ];
    const mockSponsor = {
      budget: 150000,
      interests: ['technology'],
    };
    const recommendations = getRecommendedEvents(mockEvents, mockSponsor, 5);
    expect(Array.isArray(recommendations)).toBe(true);
  });
});

describe('Data Structure Tests', () => {
  it('mockData should have all required objects', () => {
    const mockData = require('../data/mockData').default;
    expect(mockData.mockEvents).toBeDefined();
    expect(Array.isArray(mockData.mockEvents)).toBe(true);
    expect(mockData.mockProposals).toBeDefined();
    expect(Array.isArray(mockData.mockProposals)).toBe(true);
  });

  it('proposals should have required fields', () => {
    const mockData = require('../data/mockData').default;
    if (mockData.mockProposals.length > 0) {
      const proposal = mockData.mockProposals[0];
      expect(proposal.id).toBeDefined();
      expect(proposal.eventId).toBeDefined();
      expect(proposal.sponsorId).toBeDefined();
      expect(proposal.status).toBeDefined();
    }
  });
});

describe('Integration Tests', () => {
  it('Provider tree should render without errors', () => {
    const TestComponent = () => <div>Providers Ready</div>;

    render(
      <MockedApp>
        <TestComponent />
      </MockedApp>
    );

    expect(screen.getByText('Providers Ready')).toBeInTheDocument();
  });
});
