// Mock Users
export const mockUsers = {
  sponsor1: {
    id: 'sponsor1',
    name: 'Nike Inc',
    email: 'partnerships@nike.com',
    role: 'sponsor',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Nike',
    companyName: 'Nike Inc',
    industry: 'Sports & Apparel',
    budget: 500000,
    budget_currency: 'USD',
    description: 'Leading global sports brand sponsoring major sporting events.',
    verified: true,
    createdAt: '2024-01-15',
  },
  sponsor2: {
    id: 'sponsor2',
    name: 'Coca-Cola',
    email: 'sponsor@cocacola.com',
    role: 'sponsor',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CC',
    companyName: 'The Coca-Cola Company',
    industry: 'Beverages',
    budget: 750000,
    budget_currency: 'USD',
    description: 'Global beverage leader with focus on event marketing.',
    verified: true,
    createdAt: '2024-01-10',
  },
  organizer1: {
    id: 'organizer1',
    name: 'John Smith',
    email: 'john@techconf.com',
    role: 'organizer',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JS',
    organizationName: 'Tech Conference Inc',
    description: 'Organizing innovative tech conferences and hackathons.',
    verified: true,
    createdAt: '2024-01-05',
  },
  organizer2: {
    id: 'organizer2',
    name: 'Sarah Johnson',
    email: 'sarah@sportsevents.com',
    role: 'organizer',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SJ',
    organizationName: 'Sports Events Global',
    description: 'Professional sports event organizer.',
    verified: true,
    createdAt: '2024-01-08',
  },
  admin: {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@sponsiwise.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin',
  },
};

// Mock Events
export const mockEvents = [
  {
    id: 'event1',
    name: 'TechConf 2025',
    description: 'Annual technology conference bringing together innovators, entrepreneurs, and tech leaders.',
    category: 'technology',
    location: 'San Francisco, CA',
    date: '2025-05-15',
    endDate: '2025-05-17',
    organizerId: 'organizer1',
    organizer: mockUsers.organizer1,
    audience: {
      size: 5000,
      demographics: {
        ageRange: '25-45',
        interests: ['Technology', 'Innovation', 'Entrepreneurship'],
        industries: ['Tech', 'Finance', 'Education'],
      },
    },
    expectedReach: {
      inPerson: 5000,
      online: 50000,
      socialMedia: 250000,
    },
    sponsorshipTiers: [
      {
        id: 'tier1',
        name: 'Title Sponsor',
        price: 250000,
        currency: 'USD',
        benefits: [
          'Logo on all marketing materials',
          'Speaking slot (60 mins)',
          '10 VIP passes',
          'Booth space (20x20)',
          'Social media mentions (50)',
        ],
        slots: 1,
      },
      {
        id: 'tier2',
        name: 'Gold Sponsor',
        price: 100000,
        currency: 'USD',
        benefits: [
          'Logo on website and materials',
          'Speaking slot (30 mins)',
          '5 VIP passes',
          'Booth space (10x10)',
          'Social media mentions (20)',
        ],
        slots: 3,
      },
      {
        id: 'tier3',
        name: 'Silver Sponsor',
        price: 50000,
        currency: 'USD',
        benefits: [
          'Logo on website',
          '3 passes',
          'Table booth',
          'Social media mentions (10)',
        ],
        slots: 5,
      },
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    ],
    status: 'active',
    createdAt: '2024-12-01',
  },
  {
    id: 'event2',
    name: 'Global Sports Championship 2025',
    description: 'International sports championship featuring top athletes from around the world.',
    category: 'sports',
    location: 'Tokyo, Japan',
    date: '2025-07-20',
    endDate: '2025-08-10',
    organizerId: 'organizer2',
    organizer: mockUsers.organizer2,
    audience: {
      size: 100000,
      demographics: {
        ageRange: '18-65',
        interests: ['Sports', 'Fitness', 'Competition'],
        industries: ['Sports', 'Media', 'Entertainment'],
      },
    },
    expectedReach: {
      inPerson: 100000,
      online: 500000,
      socialMedia: 2000000,
    },
    sponsorshipTiers: [
      {
        id: 'tier1',
        name: 'Platinum Partner',
        price: 500000,
        currency: 'USD',
        benefits: [
          'Exclusive naming rights',
          'Logo on all materials',
          '20 VIP passes',
          'Premium booth (30x30)',
          'Daily social mentions',
        ],
        slots: 1,
      },
      {
        id: 'tier2',
        name: 'Gold Partner',
        price: 200000,
        currency: 'USD',
        benefits: [
          'Logo on signage',
          '10 passes',
          'Booth space (15x15)',
          'Weekly mentions',
        ],
        slots: 3,
      },
    ],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
    gallery: [],
    status: 'active',
    createdAt: '2024-11-15',
  },
  {
    id: 'event3',
    name: 'Music & Arts Festival 2025',
    description: 'Largest music and arts festival celebrating creativity and culture.',
    category: 'entertainment',
    location: 'Austin, TX',
    date: '2025-10-15',
    endDate: '2025-10-18',
    organizerId: 'organizer1',
    organizer: mockUsers.organizer1,
    audience: {
      size: 75000,
      demographics: {
        ageRange: '18-40',
        interests: ['Music', 'Art', 'Culture'],
        industries: ['Entertainment', 'Media', 'Fashion'],
      },
    },
    expectedReach: {
      inPerson: 75000,
      online: 300000,
      socialMedia: 1500000,
    },
    sponsorshipTiers: [
      {
        id: 'tier1',
        name: 'Headline Sponsor',
        price: 150000,
        currency: 'USD',
        benefits: [
          'Stage naming rights',
          '8 VIP passes',
          'Exclusive booth',
          'Featured in promotions',
        ],
        slots: 1,
      },
    ],
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop',
    gallery: [],
    status: 'active',
    createdAt: '2024-11-20',
  },
];

// Mock Proposals/Deals
export const mockProposals = [
  {
    id: 'proposal1',
    eventId: 'event1',
    sponsorId: 'sponsor1',
    tierId: 'tier2',
    sponsorshipAmount: 100000,
    currency: 'USD',
    status: 'pending',
    proposal: {
      message: 'We are interested in Gold sponsorship for TechConf 2025. Nike is committed to supporting innovation.',
      additionalRequests: 'We would like additional booth space and a branded keynote session.',
    },
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
  },
  {
    id: 'proposal2',
    eventId: 'event1',
    sponsorId: 'sponsor2',
    tierId: 'tier3',
    sponsorshipAmount: 50000,
    currency: 'USD',
    status: 'accepted',
    proposal: {
      message: 'Coca-Cola is excited to sponsor TechConf 2025 with our Silver package.',
      additionalRequests: null,
    },
    createdAt: '2025-01-18',
    updatedAt: '2025-01-19',
  },
  {
    id: 'proposal3',
    eventId: 'event2',
    sponsorId: 'sponsor1',
    tierId: 'tier1',
    sponsorshipAmount: 500000,
    currency: 'USD',
    status: 'negotiating',
    proposal: {
      message: 'Nike wants to be the Platinum Partner for the Global Sports Championship.',
      additionalRequests: 'Discussing enhanced athlete endorsement opportunities.',
    },
    createdAt: '2025-01-15',
    updatedAt: '2025-01-20',
  },
];

// Mock Messages
export const mockMessages = [
  {
    id: 'msg1',
    senderId: 'sponsor1',
    recipientId: 'organizer1',
    proposalId: 'proposal1',
    message: 'Hi John, we are very interested in your tech conference. Can we discuss sponsorship options?',
    timestamp: '2025-01-20T10:30:00Z',
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'organizer1',
    recipientId: 'sponsor1',
    proposalId: 'proposal1',
    message: 'Great! Nike would be perfect for TechConf. Let me send you our sponsorship packages.',
    timestamp: '2025-01-20T11:15:00Z',
    read: true,
  },
];

// Event Categories
export const eventCategories = [
  {
    id: 'technology',
    name: 'Technology',
    icon: 'Laptop',
    description: 'Tech conferences, hackathons, innovation summits',
    color: 'primary',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Activity',
    description: 'Sports events, tournaments, championships',
    color: 'error',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Music',
    description: 'Concerts, festivals, shows',
    color: 'secondary',
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'BookOpen',
    description: 'Seminars, workshops, training events',
    color: 'success',
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'Briefcase',
    description: 'Trade shows, expos, business summits',
    color: 'warning',
  },
  {
    id: 'nonprofit',
    name: 'Non-Profit',
    icon: 'Heart',
    description: 'Charity events, fundraisers, community events',
    color: 'error',
  },
];

// Mock Analytics Data
export const mockAnalytics = {
  sponsorDashboard: {
    activeSponsorship: 2,
    totalInvestment: 650000,
    estimatedReach: 2750000,
    engagementRate: 8.5,
    roiMetrics: [
      { month: 'Jan', impressions: 125000, clicks: 5600, conversions: 280 },
      { month: 'Feb', impressions: 142000, clicks: 6800, conversions: 340 },
      { month: 'Mar', impressions: 156000, clicks: 7200, conversions: 360 },
    ],
  },
  organizerDashboard: {
    totalEvents: 3,
    activeSponsorship: 5,
    totalRevenue: 900000,
    sponsorEngagement: 94,
    revenueByMonth: [
      { month: 'Jan', revenue: 200000 },
      { month: 'Feb', revenue: 350000 },
      { month: 'Mar', revenue: 350000 },
    ],
  },
  adminDashboard: {
    totalUsers: 150,
    activeDeals: 45,
    platformRevenue: 135000,
    totalTransactions: 320,
    growthRate: 23.5,
    platformStats: [
      { month: 'Jan', revenue: 30000, deals: 10 },
      { month: 'Feb', revenue: 52000, deals: 18 },
      { month: 'Mar', revenue: 53000, deals: 17 },
    ],
  },
};

// Testimonials for landing page
export const testimonials = [
  {
    id: 1,
    name: 'Mark Chen',
    role: 'CEO, Tech Conference Inc',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=MC',
    quote:
      'SponsiWise helped us secure $500K in sponsorships for our conference. The platform made deal negotiation seamless.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jessica Rivera',
    role: 'Partnership Manager, Nike',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=JR',
    quote:
      'Finding the right events to sponsor used to take weeks. Now it takes hours. SponsiWise is a game-changer.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Kumar',
    role: 'Events Director, Sports Global',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=DK',
    quote: 'The analytics dashboard helped us understand sponsor ROI and justify our investment decisions.',
    rating: 5,
  },
];

// Featured brands (for landing page)
export const featuredBrands = [
  {
    name: 'Nike',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Nike',
  },
  {
    name: 'Coca-Cola',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CC',
  },
  {
    name: 'Microsoft',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MS',
  },
  {
    name: 'Google',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Google',
  },
  {
    name: 'Samsung',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Samsung',
  },
  {
    name: 'BMW',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BMW',
  },
];

// Pricing Plans
export const pricingPlans = [
  {
    id: 'plan-starter',
    name: 'Starter',
    description: 'Perfect for businesses new to event sponsorship',
    price: 0,
    currency: 'USD',
    billing: 'month',
    features: [
      'Access to marketplace',
      'Up to 5 active proposals',
      'Basic analytics',
      'Community support',
      'Standard commission (15%)',
    ],
    limits: {
      activeProposals: 5,
      analyticsMonths: 3,
      supportPriority: 'standard',
    },
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    description: 'For growing sponsorship programs',
    price: 99,
    currency: 'USD',
    billing: 'month',
    features: [
      'Unlimited proposals',
      'Advanced analytics & ROI tracking',
      'Smart recommendations',
      'Priority support',
      'Reduced commission (12%)',
      'Deal templates',
      'Bulk actions',
    ],
    limits: {
      activeProposals: -1,
      analyticsMonths: 12,
      supportPriority: 'priority',
    },
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'For large-scale sponsorship operations',
    price: 'Custom',
    currency: 'USD',
    billing: 'annual',
    features: [
      'Everything in Growth',
      'Custom commission rates',
      'Dedicated account manager',
      'API access',
      'White-label options',
      'Advanced reporting',
      '24/7 phone support',
      'Custom integrations',
    ],
    limits: {
      activeProposals: -1,
      analyticsMonths: 36,
      supportPriority: 'enterprise',
    },
    cta: 'Contact Sales',
    highlighted: false,
  },
];

// Mock Subscriptions (linked to users)
export const mockSubscriptions = {
  sponsor1: {
    userId: 'sponsor1',
    planId: 'plan-growth',
    status: 'active',
    startDate: '2024-10-01',
    renewalDate: '2025-10-01',
    autoRenew: true,
    monthlyBilled: true,
  },
  sponsor2: {
    userId: 'sponsor2',
    planId: 'plan-starter',
    status: 'active',
    startDate: '2024-12-01',
    renewalDate: '2025-12-01',
    autoRenew: true,
    monthlyBilled: true,
  },
};

// Mock Transactions
export const mockTransactions = [
  {
    id: 'txn-001',
    type: 'payment',
    proposalId: 'proposal2',
    sponsorId: 'sponsor2',
    organizerId: 'organizer1',
    amount: 50000,
    currency: 'USD',
    commission: 7500,
    organizerReceives: 42500,
    status: 'completed',
    paymentMethod: 'credit_card',
    createdAt: '2025-01-19',
    completedAt: '2025-01-19',
  },
  {
    id: 'txn-002',
    type: 'payout',
    proposalId: 'proposal2',
    organizerId: 'organizer1',
    amount: 42500,
    currency: 'USD',
    status: 'completed',
    payoutMethod: 'bank_transfer',
    createdAt: '2025-01-19',
    completedAt: '2025-01-20',
  },
];

// Mock Invoices
export const mockInvoices = [
  {
    id: 'inv-001',
    number: 'INV-2025-001',
    type: 'sponsorship',
    proposalId: 'proposal2',
    sponsorId: 'sponsor2',
    organizerId: 'organizer1',
    amount: 50000,
    commission: 7500,
    organizerReceives: 42500,
    currency: 'USD',
    issueDate: '2025-01-19',
    dueDate: '2025-02-19',
    status: 'paid',
    items: [
      {
        description: 'Silver Sponsor - TechConf 2025',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
      },
    ],
  },
];

// Enhanced Mock Proposals with history
export const enhancedMockProposals = [
  {
    id: 'proposal1',
    eventId: 'event1',
    sponsorId: 'sponsor1',
    tierId: 'tier2',
    sponsorshipAmount: 100000,
    currency: 'USD',
    status: 'negotiating',
    createdByRole: 'sponsor',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-22',
    lastUpdatedBy: 'organizer1',
    proposal: {
      message: 'We are interested in Gold sponsorship for TechConf 2025. Nike is committed to supporting innovation.',
      additionalRequests: 'We would like additional booth space and a branded keynote session.',
    },
    history: [
      {
        timestamp: '2025-01-20T10:30:00Z',
        status: 'pending',
        changedBy: 'sponsor1',
        action: 'created',
        notes: 'Initial proposal submission',
      },
      {
        timestamp: '2025-01-20T14:00:00Z',
        status: 'reviewing',
        changedBy: 'organizer1',
        action: 'status_change',
        notes: 'Organizer reviewing proposal',
      },
      {
        timestamp: '2025-01-21T09:00:00Z',
        status: 'negotiating',
        changedBy: 'organizer1',
        action: 'status_change',
        notes: 'Opened negotiation - counter offer pending',
      },
    ],
    negotiations: [
      {
        id: 'neg-1',
        from: 'organizer1',
        type: 'counter_offer',
        message: 'Interested in Gold tier. Can we discuss customizing the booth space?',
        proposedAmount: 100000,
        proposedTerms: 'Booth space negotiable, keynote possible with additional fee',
        timestamp: '2025-01-21T09:00:00Z',
      },
    ],
  },
  {
    id: 'proposal2',
    eventId: 'event1',
    sponsorId: 'sponsor2',
    tierId: 'tier3',
    sponsorshipAmount: 50000,
    currency: 'USD',
    status: 'accepted',
    createdByRole: 'sponsor',
    createdAt: '2025-01-18',
    updatedAt: '2025-01-19',
    lastUpdatedBy: 'organizer1',
    proposal: {
      message: 'Coca-Cola is excited to sponsor TechConf 2025 with our Silver package.',
      additionalRequests: null,
    },
    history: [
      {
        timestamp: '2025-01-18T11:00:00Z',
        status: 'pending',
        changedBy: 'sponsor2',
        action: 'created',
        notes: 'Proposal created',
      },
      {
        timestamp: '2025-01-18T15:30:00Z',
        status: 'reviewing',
        changedBy: 'organizer1',
        action: 'status_change',
        notes: 'Under review',
      },
      {
        timestamp: '2025-01-19T10:00:00Z',
        status: 'accepted',
        changedBy: 'organizer1',
        action: 'status_change',
        notes: 'Accepted and invoice generated',
      },
    ],
    negotiations: [],
  },
];

// Admin Platform Settings
export const adminSettings = {
  defaultCommissionRate: 0.15,
  activePlans: ['plan-starter', 'plan-growth', 'plan-enterprise'],
  payoutSchedule: 'weekly',
  platformFees: {
    paymentProcessing: 0.029,
    platformCommission: 0.15,
  },
};

// Pending User Approvals
export const pendingUserApprovals = [
  {
    id: 'user-pending-1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    role: 'sponsor',
    appliedAt: '2025-01-25',
    industry: 'Manufacturing',
    budget: 250000,
    status: 'pending',
  },
  {
    id: 'user-pending-2',
    name: 'Jane Doe Events',
    email: 'jane@doevents.com',
    role: 'organizer',
    appliedAt: '2025-01-26',
    organizationType: 'Conference Organizer',
    status: 'pending',
  },
];

// Pending Listing Approvals
export const pendingListingApprovals = [
  {
    id: 'list-pending-1',
    eventName: 'AI Summit 2025',
    organizerId: 'organizer-pending-1',
    organizerName: 'Tech Innovations Inc',
    submittedAt: '2025-01-26',
    category: 'technology',
    location: 'San Francisco, CA',
    date: '2025-06-15',
    status: 'pending',
  },
];

// Mock Disputes
export const mockDisputes = [
  {
    id: 'dispute-1',
    proposalId: 'proposal1',
    initiatedBy: 'organizer1',
    type: 'payment_discrepancy',
    title: 'Amount mismatch on invoice',
    description: 'Invoice shows different amount than agreed',
    status: 'open',
    priority: 'high',
    createdAt: '2025-01-25',
  },
];
