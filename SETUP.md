# SponsiWise - Setup & Launch Guide

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Terminal/Command line access

## 🚀 Quick Start (3 Minutes)

### Step 1: Install Dependencies
```bash
cd /Users/sudhanshukumar/Desktop/sponsiwise
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Step 3: Login with Demo Account
- Email: `partnerships@nike.com`
- Password: `demo`
- Role: Sponsor

**Or try:**
- Email: `john@techconf.com` (Organizer)
- Email: `admin@sponsiwise.com` (Admin)

---

## 🎯 Feature Tour

### Landing Page (`/`)
- Value proposition
- How it works
- Trusted brands
- Call-to-action buttons

### Role Selection (`/auth/roles`)
- Choose Sponsor, Organizer, or Agency
- Learn what each role can do

### Authentication
- Signup (`/auth/sponsor`, `/auth/organizer`, etc.)
- Login (`/login`)
- Mock credentials for testing

### Marketplace (`/marketplace`)
- Browse 5K+ events
- Filter by category, budget, location
- Search events
- Sort by price, audience, date

### Event Details (`/event/:eventId`)
- Full event information
- Sponsorship packages
- Audience demographics
- Expected reach metrics
- Create proposal button

### Dashboard (`/dashboard`)
- **Sponsor**: View active sponsorships, ROI, proposals
- **Organizer**: Manage events, track revenue
- **Admin**: Platform analytics, user management

---

## 🔧 Architecture Overview

### Components
All UI components in `src/components/`:
- `Header` - Navigation bar
- `Footer` - Footer with links
- `EventCard` - Event listing card
- `FormElements` - Input, Button, Select, Textarea
- `UI` - Modal, Tabs, Badge, Card
- `ProtectedRoute` - Auth guard

### Pages
Route pages in `src/pages/`:
- `Landing` - Homepage
- `RoleSelection` - Choose user role
- `Login` - Authentication
- `Signup` - Registration
- `Marketplace` - Event discovery
- `EventDetails` - Event page
- `Dashboard` - Role-specific dashboard

### Context (State Management)
Two main contexts in `src/context/`:
- `AuthContext` - User authentication, roles, permissions
- `MarketplaceContext` - Events, proposals, messages

### Utilities
Helper functions in `src/utils/helpers.js`:
- `formatCurrency()` - Format prices
- `formatDate()` - Format dates
- `filterEvents()` - Filter event list
- `sortEvents()` - Sort event list
- `calculateCommission()` - Calculate fees
- `getStatusColor()` - Get status badge color

---

## 📝 Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.jsx`
2. Export component
3. Add route in `src/App.jsx`

Example:
```jsx
// src/pages/NewPage.jsx
export const NewPage = () => {
  return <MainLayout>Your content</MainLayout>;
};

// src/App.jsx
import { NewPage } from './pages';
// Add route:
<Route path="/new-page" element={<NewPage />} />
```

### Add Component
1. Create file in `src/components/MyComponent.jsx`
2. Export component
3. Add to `src/components/index.js`

### Modify Styles
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Use Tailwind classes in components

### Add Context
1. Create context in `src/context/MyContext.jsx`
2. Wrap app with provider in `src/App.jsx`
3. Use `useContext()` hook in components

---

## 🗂️ File Tree

```
sponsiwise/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── EventCard.jsx
│   │   ├── FormElements.jsx
│   │   ├── UI.jsx
│   │   ├── Alert.jsx
│   │   ├── Loading.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── index.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── MarketplaceContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── RoleSelection.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Marketplace.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Dashboard.jsx
│   │   └── index.js
│   │
│   ├── layouts/
│   │   └── index.jsx
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── PLATFORM_DOCS.md
└── README.md
```

---

## 🎨 Customization

### Change Logo
Edit `Header.jsx` and `Footer.jsx` - replace "S" logo

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* Your color palette */ },
  secondary: { /* Your color palette */ },
}
```

### Add Analytics
Replace mock data in `src/data/mockData.js`

### Update Content
- Landing page: `src/pages/Landing.jsx`
- Testimonials: `src/data/mockData.js`
- Event categories: `src/data/mockData.js`

---

## ⚡ Performance Tips

- Components use memoization where needed
- Events filtered/sorted efficiently
- Lazy load route components (add with React.lazy)
- Images optimized via URLs

### Add Lazy Loading
```jsx
const EventDetails = React.lazy(() => import('./pages/EventDetails'));

<Suspense fallback={<Loading />}>
  <Route path="/event/:id" element={<EventDetails />} />
</Suspense>
```

---

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### Styles not loading
- Check Tailwind CSS is running
- Verify `index.css` is imported in `main.jsx`
- Clear browser cache

### Can't login
- Check email matches mock data in `mockData.js`
- Password is always "demo" for mock
- Check browser console for errors

### Components not found
- Verify exports in `src/components/index.js`
- Check file paths are correct
- Restart dev server

---

## 📦 Building for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview

# Deploy to hosting
# Output is in 'dist/' folder
```

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **AWS S3**: Upload `dist/` folder
- **Traditional Server**: Copy `dist/` to web root

---

## 🔐 Security Notes

### Current (Demo)
- Mock authentication using localStorage
- No password hashing
- No backend validation

### Production Checklist
- [ ] Replace mock auth with real JWT
- [ ] Add backend validation
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user input
- [ ] Use secure cookies
- [ ] Add audit logging
- [ ] Regular security updates

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [lucide-react Icons](https://lucide.dev)

---

## ✅ Checklist Before Launch

- [ ] Test all pages work
- [ ] Test auth flows
- [ ] Test on mobile (responsive design)
- [ ] Check for console errors
- [ ] Test all filters & search
- [ ] Try demo accounts
- [ ] Verify CTAs work
- [ ] Check footer links
- [ ] Test dark mode (if applicable)

---

## 🚀 Ready?

Your sponsorship marketplace is ready to launch!

**Need help?**
- Check PLATFORM_DOCS.md for architecture
- Review component JSDoc comments
- Inspect src/ files for implementation details

**Happy coding!** 🎉
