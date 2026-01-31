# SponsiWise - Sponsorship Marketplace Platform

A complete, market-ready web application built with React.js that acts as a mediator between sponsors and event organizers. Built with modern tech stack for startup readiness and investor appeal.

## 🎯 Platform Overview

SponsiWise connects:
- **Sponsors/Brands** seeking to sponsor relevant events
- **Event Organizers** looking for sponsorship support
- **Agencies** managing multiple sponsors
- **Admin** managing the platform

## ✨ Key Features Implemented

### 1. **Marketplace & Discovery**
- Advanced event filtering (category, budget, location, audience size)
- Intelligent event cards with key metrics
- Real-time search functionality
- Sortable results (recent, price, audience)
- Responsive grid layout

### 2. **Authentication & RBAC**
- Role-based access control (Sponsor, Organizer, Agency, Admin)
- Session management via localStorage
- Protected routes
- Demo login credentials for testing

### 3. **Event Management**
- Comprehensive event details page
- Sponsorship tier system (Gold/Silver/Platinum)
- Audience demographics visualization
- Expected reach & impact metrics
- Event organizer profiles

### 4. **Proposal System**
- Create sponsorship proposals
- Proposal status tracking (pending, negotiating, accepted, rejected)
- Message exchange between sponsors and organizers
- Deal confirmation workflow

### 5. **Dashboard System**
- **Sponsor Dashboard**: Active sponsorships, investment tracking, ROI metrics
- **Organizer Dashboard**: Event management, revenue tracking, sponsor engagement
- **Admin Dashboard**: Platform analytics, user management, revenue monitoring

### 6. **Landing Page**
- Hero section with clear value proposition
- How it works (3-step process)
- Event categories showcase
- Trust badges & featured brands
- Testimonials from real users
- High-quality CTA sections

### 7. **Analytics & Metrics**
- Real-time analytics dashboards
- ROI tracking for sponsors
- Revenue analytics for organizers
- Growth metrics for admin
- Interactive charts (mock data ready)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Context API** - State management

### Development
- **Vite 7** - Build tool
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Navigation
│   ├── Footer.jsx       # Footer
│   ├── EventCard.jsx    # Event listing card
│   ├── FormElements.jsx # Form inputs
│   ├── UI.jsx           # Modal, tabs, badges, cards
│   ├── Alert.jsx        # Alert component
│   ├── Loading.jsx      # Loading states
│   ├── ProtectedRoute.jsx # Auth guard
│   └── index.js         # Component exports
│
├── context/             # State management
│   ├── AuthContext.jsx  # Authentication & authorization
│   └── MarketplaceContext.jsx # Marketplace data
│
├── data/               # Mock data
│   └── mockData.js     # Sample users, events, proposals
│
├── pages/              # Route pages
│   ├── Landing.jsx     # Homepage
│   ├── RoleSelection.jsx # Role picker
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration
│   ├── Marketplace.jsx # Event discovery
│   ├── EventDetails.jsx # Event detail page
│   ├── Dashboard.jsx   # Role-specific dashboard
│   └── index.js        # Page exports
│
├── layouts/            # Layout components
│   └── index.jsx       # MainLayout, DashboardLayout
│
├── utils/              # Utilities
│   └── helpers.js      # Helper functions
│
├── App.jsx             # Main app component & routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The app runs on `http://localhost:5173` by default (Vite).

## 👤 Demo Accounts

Test the platform with these credentials:

| Role | Email | Password |
|------|-------|----------|
| Sponsor (Nike) | partnerships@nike.com | demo |
| Organizer | john@techconf.com | demo |
| Admin | admin@sponsiwise.com | demo |

**Note**: Passwords are for demo only. Never use in production!

## 🔐 Authentication Flow

1. **User visits** → Landing page with role selection
2. **Select role** → Redirected to signup or login
3. **Authenticate** → Stored in localStorage (mock)
4. **Access dashboard** → Role-specific content
5. **Logout** → Session cleared

## 💼 User Roles & Permissions

### Sponsor
- ✅ Browse events
- ✅ Send proposals
- ✅ Track ROI
- ✅ Manage sponsorships
- ✅ View analytics

### Event Organizer  
- ✅ Create events
- ✅ Set sponsorship tiers
- ✅ Review proposals
- ✅ Accept/reject deals
- ✅ Track revenue

### Agency
- ✅ Browse events
- ✅ Submit proposals on behalf of brands
- ✅ Manage multiple clients
- ✅ Track commission

### Admin
- ✅ Approve users
- ✅ Monitor deals
- ✅ Set commission rates
- ✅ View platform analytics
- ✅ Manage disputes

## 🎨 Design Highlights

### Brand Identity
- **Color Scheme**: Primary (Sky Blue), Secondary (Purple), Neutral grays
- **Typography**: Modern sans-serif (Inter-compatible)
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle, professional shadows

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Flexible grid layouts
- Touch-friendly interactions

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Form validation

## 📊 Data Flow

```
App
├── AuthProvider
│   └── useAuth() hook
│       ├── Authentication state
│       ├── Role checking
│       └── Permission management
│
└── MarketplaceProvider
    └── useMarketplace() hook
        ├── Events state
        ├── Proposals state
        ├── Messages state
        └── CRUD operations
```

## 🔗 API Integration (Ready)

The platform is built with mock data but designed for easy backend integration:

### Key Endpoints (To be implemented)
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout

GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

GET    /api/proposals
POST   /api/proposals
PUT    /api/proposals/:id

POST   /api/messages
GET    /api/messages

GET    /api/analytics
```

## 💰 Monetization Hooks

1. **Commission Rate**: Configurable (default 10%)
2. **Premium Listings**: For organizers
3. **Subscription Plans**: For sponsors
4. **Feature Unlocks**: Advanced analytics

## 📈 Scalability Considerations

### Architecture
- **Separation of Concerns**: Components, contexts, utilities
- **Reusable Components**: UI kit for consistency
- **Custom Hooks**: Authentication & marketplace logic
- **Context API**: Lightweight state management (upgradeable to Redux)

### Performance
- Code splitting (route-based)
- Lazy loading (images, components)
- Memoization for expensive renders
- Responsive images

### Future Enhancements
- **Backend**: Node.js/Express + MongoDB
- **Real-time**: WebSockets for messaging
- **Analytics**: Charts library (Recharts)
- **Payments**: Stripe/PayPal integration
- **Storage**: AWS S3 for media
- **Scaling**: Docker, Kubernetes
- **CI/CD**: GitHub Actions

## 🧪 Testing Strategy

### To Be Implemented
- Unit tests (Jest + React Testing Library)
- Integration tests
- E2E tests (Cypress)
- Performance testing

## 📝 Component Documentation

All components include JSDoc comments explaining:
- **Purpose**: What the component does
- **Props**: Input parameters
- **Returns**: What it renders
- **Usage**: Example implementation

## 🎯 Next Steps for Production

1. **Backend Setup**
   - Create API endpoints
   - Database design (MongoDB/PostgreSQL)
   - Authentication (JWT)
   - Payment processing

2. **Enhancements**
   - Real-time messaging
   - Email notifications
   - SMS alerts
   - Video conferencing

3. **DevOps**
   - Docker containerization
   - CI/CD pipeline
   - Monitoring & logging
   - Error tracking (Sentry)

4. **Compliance**
   - GDPR compliance
   - Data encryption
   - Terms & Privacy Policy
   - Security audit

## 🤝 Contributing

When adding features:
1. Follow the existing folder structure
2. Create reusable components
3. Add comments & JSDoc
4. Update this README
5. Test across browsers

## 📄 License

© 2025 SponsiWise. All rights reserved.

## 👨‍💻 Built With ❤️

This platform was built for sponsors and event organizers who deserve better. 

---

**Ready to transform sponsorships? SponsiWise makes it happen.**
