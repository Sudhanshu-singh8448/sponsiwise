# SponsiWise Developer Guide

Complete reference for building features on the SponsiWise platform.

## 🏗️ Architecture Principles

### 1. Component-Driven Development
- **Atomic Design**: Build from atoms (buttons) to pages
- **Single Responsibility**: Each component does one thing
- **Props-Based**: Pass data via props, not globals
- **Controlled Components**: Manage state explicitly

### 2. State Management
- **Context API**: For global state (auth, marketplace data)
- **Component State**: For local/temporary state (form inputs)
- **localStorage**: For persistence (user session)
- **Custom Hooks**: For reusable logic

### 3. Routing
- **React Router v7**: Client-side routing
- **Protected Routes**: Use `<ProtectedRoute>` for auth
- **Role Gates**: Use `<RoleGate>` for conditional rendering
- **Dynamic Routes**: Support URL parameters (`:id`)

## 📝 Coding Standards

### Component Template
```jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components';

/**
 * ComponentName - Brief description
 * 
 * @component
 * @example
 * return <ComponentName prop1="value" />
 */
export const ComponentName = ({ prop1, prop2 = 'default' }) => {
  const [state, setState] = useState('initial');
  const { user } = useAuth();

  return (
    <div className="container-custom">
      <Card size="lg">
        {/* Your content */}
      </Card>
    </div>
  );
};

export default ComponentName;
```

### CSS Classes Order (Tailwind)
```jsx
<div className="
  /* Layout */ flex flex-col gap-4
  /* Display */ hidden md:block
  /* Sizing */ w-full h-12
  /* Spacing */ px-4 py-2 mb-4
  /* Text */ text-lg font-bold text-neutral-900
  /* Background */ bg-primary-50
  /* Border */ border border-neutral-200 rounded-lg
  /* Effects */ shadow-md hover:shadow-lg
  /* Animation */ transition-all duration-200
">
  Content
</div>
```

### Naming Conventions
- **Components**: PascalCase (`EventCard.jsx`)
- **Hooks**: camelCase starting with `use` (`useAuth`)
- **Functions**: camelCase (`handleSubmit()`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **CSS Classes**: kebab-case (`.card-lg`)

## 🎣 Custom Hooks

### useAuth Hook
```jsx
import { useAuth } from '../context/AuthContext';

// Usage in component
const MyComponent = () => {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();
  
  return (
    <>
      {isAuthenticated && (
        <p>Hello, {user.name}!</p>
      )}
    </>
  );
};
```

### useMarketplace Hook
```jsx
import { useMarketplace } from '../context/MarketplaceContext';

const EventBrowser = () => {
  const { 
    events, 
    getEventById, 
    createProposal, 
    getProposals,
    loading 
  } = useMarketplace();

  return (
    // Render events
  );
};
```

### Create Custom Hook
```jsx
// src/hooks/useFormValidation.js
import { useState } from 'react';

export const useFormValidation = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate & submit
  };

  return { values, errors, handleChange, handleSubmit };
};

// Usage
const MyForm = () => {
  const { values, handleChange, handleSubmit } = 
    useFormValidation({ email: '' }, submitForm);
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
};
```

## 🔄 Data Flow Examples

### Fetching Events
```jsx
import { useMarketplace } from '../context/MarketplaceContext';

const EventList = () => {
  const { events, loading } = useMarketplace();

  if (loading) return <Loading />;

  return events.map(event => (
    <EventCard key={event.id} event={event} />
  ));
};
```

### Creating Proposal
```jsx
const { createProposal, loading } = useMarketplace();

const handleSubmit = async (formData) => {
  try {
    await createProposal({
      eventId: event.id,
      sponsorId: user.id,
      tierId: selectedTier.id,
      sponsorshipAmount: selectedTier.price,
    });
    // Success - redirect or show message
  } catch (error) {
    // Handle error
  }
};
```

## 📱 Building Responsive Components

### Mobile-First Approach
```jsx
<div className="
  // Mobile (default)
  grid grid-cols-1 gap-4
  // Tablet
  md:grid-cols-2 md:gap-6
  // Desktop
  lg:grid-cols-3 lg:gap-8
">
  {items.map(item => (...))}
</div>
```

### Hide/Show Elements
```jsx
<nav className="hidden md:flex">Desktop Navigation</nav>
<nav className="md:hidden">Mobile Navigation</nav>
```

### Responsive Images
```jsx
<img 
  src="image.jpg" 
  className="
    w-full h-40 md:h-48 lg:h-64
    object-cover rounded-lg
  " 
/>
```

## 🎯 Form Handling

### Controlled Input
```jsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<Input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

### Form Validation
```jsx
const validateForm = () => {
  const newErrors = {};

  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Invalid email';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Form Submission
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  try {
    const result = await apiCall(formData);
    // Success
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 🎨 Component Composition

### Combining Components
```jsx
const EventPage = () => {
  return (
    <MainLayout>
      <Hero />
      <EventDetails />
      <Sidebar />
      <RelatedEvents />
    </MainLayout>
  );
};
```

### Passing Props Down
```jsx
<EventCard 
  event={event}
  onSelect={handleSelectEvent}
  showBadge={true}
/>

// Inside EventCard
const EventCard = ({ event, onSelect, showBadge }) => {
  return (
    <Card onClick={() => onSelect(event.id)}>
      {showBadge && <Badge>{event.category}</Badge>}
    </Card>
  );
};
```

### Render Props Pattern
```jsx
<Modal>
  {({ close }) => (
    <>
      <p>Modal Content</p>
      <Button onClick={close}>Close</Button>
    </>
  )}
</Modal>
```

## 🚀 Performance Optimization

### Memoization
```jsx
import { useMemo } from 'react';

const expensiveList = useMemo(() => {
  return events.filter(e => e.budget > 100000);
}, [events]);
```

### Callback Memoization
```jsx
import { useCallback } from 'react';

const handleClick = useCallback(() => {
  // Do something
}, [dependency]);
```

### Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const EventDetails = lazy(() => import('./pages/EventDetails'));

<Suspense fallback={<Loading />}>
  <EventDetails />
</Suspense>
```

## 📡 API Integration

### Current: Mock Endpoints
```jsx
// Mock implementation in context
const getEvents = useCallback(async () => {
  // Simulate API call
  await delay(1000);
  return mockEvents;
}, []);
```

### Future: Real API
```jsx
const getEvents = useCallback(async () => {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}, []);
```

### Error Handling
```jsx
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError(error.message);
  console.error('Fetch error:', error);
} finally {
  setLoading(false);
}
```

## 🧪 Testing Components

### Unit Test Example
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick handler', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  await userEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

## 🐛 Debugging

### Console Logging
```jsx
useEffect(() => {
  console.log('Events updated:', events);
}, [events]);
```

### React DevTools
- Install React DevTools browser extension
- Inspect components tree
- Check props and state
- Profile performance

### Network Tab
- Check API calls in DevTools
- Verify request/response
- Check for CORS issues

## 📚 Common Patterns

### Loading State
```jsx
const [loading, setLoading] = useState(false);

if (loading) return <Loading />;
return <Content />;
```

### Error Handling
```jsx
const [error, setError] = useState(null);

if (error) return <Alert type="error" message={error} />;
```

### Empty State
```jsx
if (events.length === 0) {
  return <EmptyState message="No events found" />;
}
```

### Conditional Rendering
```jsx
{isAuthenticated && <UserMenu />}
{!isAuthenticated && <LoginButton />}

{hasRole('admin') && <AdminPanel />}

{user?.role === 'sponsor' && <SponsorDashboard />}
```

## 🔗 Adding New Features

### Checklist
- [ ] Plan component structure
- [ ] Create reusable components
- [ ] Add state management (if needed)
- [ ] Add routes
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test all flows
- [ ] Update documentation
- [ ] Optimize performance

### Example: Add "Saved Events" Feature

1. **Add to Context**
```jsx
// AuthContext.jsx
const [savedEvents, setSavedEvents] = useState([]);

const saveEvent = useCallback((eventId) => {
  setSavedEvents(prev => [...prev, eventId]);
}, []);
```

2. **Create Component**
```jsx
// SaveButton.jsx
export const SaveButton = ({ eventId }) => {
  const { savedEvents, saveEvent } = useAuth();
  const isSaved = savedEvents.includes(eventId);

  return (
    <Button onClick={() => saveEvent(eventId)}>
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};
```

3. **Add Route**
```jsx
<Route path="/saved-events" element={<SavedEvents />} />
```

4. **Create Page**
```jsx
export const SavedEvents = () => {
  const { savedEvents } = useAuth();
  const { getEventById } = useMarketplace();

  return (
    <MainLayout>
      {savedEvents.map(id => (
        <EventCard key={id} event={getEventById(id)} />
      ))}
    </MainLayout>
  );
};
```

---

## 🎓 Learning Resources

### For Each Technology
- **React**: [react.dev](https://react.dev)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **React Router**: [reactrouter.com](https://reactrouter.com)
- **Vite**: [vitejs.dev](https://vitejs.dev)

### Best Practices
- [React Best Practices](https://react.dev/reference/rules)
- [Tailwind Tips](https://tailwindcss.com/docs)
- [Performance Guide](https://web.dev/performance/)

---

**Happy developing!** 🚀

Have questions? Check the component JSDoc comments or review similar implementations.
