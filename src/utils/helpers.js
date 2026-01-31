/**
 * Utility functions for the SponsiWise platform
 */

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Calculate commission (default 15%)
export const calculateCommission = (amount, commissionRate = 0.15) => {
  return amount * commissionRate;
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Check if user has access to resource
export const canAccessResource = (user, resource) => {
  if (user?.role === 'admin') return true;
  if (resource?.ownerId === user?.id) return true;
  return false;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Filter events by criteria
export const filterEvents = (events, filters) => {
  return events.filter((event) => {
    if (filters.category && event.category !== filters.category) return false;
    if (filters.search && !event.name.toLowerCase().includes(filters.search.toLowerCase()))
      return false;
    if (
      filters.minBudget &&
      event.sponsorshipTiers[0].price < filters.minBudget
    )
      return false;
    if (
      filters.maxBudget &&
      event.sponsorshipTiers[event.sponsorshipTiers.length - 1].price >
        filters.maxBudget
    )
      return false;
    if (filters.location && !event.location.includes(filters.location))
      return false;
    return true;
  });
};

// Calculate deal value including commission
export const calculateDealValue = (sponsorshipAmount, commissionRate = 0.15) => {
  const commission = calculateCommission(sponsorshipAmount, commissionRate);
  const organizerReceives = sponsorshipAmount - commission;
  return { sponsorshipAmount, commission, organizerReceives };
};

// Get proposal status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    reviewing: 'warning',
    negotiating: 'warning',
    accepted: 'success',
    rejected: 'error',
    completed: 'success',
    paid: 'success',
    unpaid: 'error',
    processing: 'warning',
    active: 'success',
    inactive: 'error',
    open: 'error',
  };
  return colors[status] || 'primary';
};

// Get proposal status label
export const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending Review',
    reviewing: 'Reviewing',
    negotiating: 'Under Negotiation',
    accepted: 'Accepted',
    rejected: 'Rejected',
    completed: 'Completed',
    paid: 'Paid',
    unpaid: 'Unpaid',
    processing: 'Processing',
  };
  return labels[status] || status;
};

// Sort events by criteria
export const sortEvents = (events, sortBy = 'recent') => {
  const sorted = [...events];
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'price-low':
      return sorted.sort(
        (a, b) => a.sponsorshipTiers[0].price - b.sponsorshipTiers[0].price
      );
    case 'price-high':
      return sorted.sort(
        (a, b) => b.sponsorshipTiers[0].price - a.sponsorshipTiers[0].price
      );
    case 'audience-size':
      return sorted.sort((a, b) => b.audience.size - a.audience.size);
    default:
      return sorted;
  }
};

// Get user initials for avatar
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};



// Format date with time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate CPM (Cost Per Thousand Impressions)
export const calculateCPM = (cost, impressions) => {
  if (!impressions || impressions === 0) return 0;
  return (cost / impressions) * 1000;
};

// Calculate ROI percentage
export const calculateROI = (investment, return_value) => {
  if (!investment || investment === 0) return 0;
  return ((return_value - investment) / investment) * 100;
};

// Generate invoice number
export const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
  return `INV-${year}${month}-${random}`;
};

// Recommend events for sponsor based on fit score
export const scoreEventForSponsor = (event, sponsor) => {
  let score = 0;

  // Budget fit (0-30 points)
  if (event.sponsorshipTiers && sponsor.budget) {
    const minTierPrice = Math.min(...event.sponsorshipTiers.map(t => t.price));
    if (sponsor.budget >= minTierPrice) {
      score += 30;
    } else if (sponsor.budget >= minTierPrice * 0.75) {
      score += 20;
    } else {
      score += 10;
    }
  }

  // Audience size fit (0-30 points)
  if (event.audience?.size) {
    const audienceSize = event.audience.size;
    if (audienceSize >= 50000) {
      score += 30;
    } else if (audienceSize >= 10000) {
      score += 20;
    } else {
      score += 10;
    }
  }

  // Industry/Interest alignment (0-40 points)
  if (event.audience?.demographics?.interests && sponsor.industry) {
    const interests = event.audience.demographics.interests.map(i => i.toLowerCase());
    const industryMatches = interests.filter(i => 
      sponsor.industry.toLowerCase().includes(i) || i.includes(sponsor.industry.toLowerCase())
    ).length;
    if (industryMatches > 0) {
      score += Math.min(40, industryMatches * 15);
    } else {
      score += 5;
    }
  }

  return Math.min(100, score);
};

// Get recommended events for sponsor
export const getRecommendedEvents = (events, sponsor, limit = 5) => {
  return events
    .map(event => ({
      ...event,
      fitScore: scoreEventForSponsor(event, sponsor),
    }))
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, limit);
};

// Mock API delay
export const delay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
