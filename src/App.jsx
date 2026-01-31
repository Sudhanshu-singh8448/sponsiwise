import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { BillingProvider } from './context/BillingContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import {
  Landing,
  RoleSelection,
  Login,
  Signup,
  Marketplace,
  EventDetails,
  Dashboard,
  Deals,
  DealDetails,
  Billing,
  PaymentCheckout,
  PricingPlans,
  SponsorAnalytics,
  OrganizerAnalytics,
  AdminAnalytics,
  Messages,
  AdminConsole,
  AdminMonetization,
  AgencyDashboard,
} from './pages';

// Error Pages
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-8">Page not found</p>
      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  </div>
);

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-neutral-900 mb-4">403</h1>
      <p className="text-xl text-neutral-600 mb-8">Unauthorized access</p>
      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  </div>
);

/**
 * AppContent - Routes after auth
 */
function AppContent() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className="page-enter">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/pricing" element={<PricingPlans />} />

        {/* Auth Routes */}
        <Route path="/auth/roles" element={<RoleSelection />} />
        <Route path="/auth/:role" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Dashboard & Deals */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deals"
          element={
            <ProtectedRoute>
              <Deals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deal/:id"
          element={
            <ProtectedRoute>
              <DealDetails />
            </ProtectedRoute>
          }
        />

        {/* Billing Routes */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PaymentCheckout />
            </ProtectedRoute>
          }
        />

        {/* Analytics Routes */}
        <Route
          path="/analytics/sponsor"
          element={
            <ProtectedRoute>
              <SponsorAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/organizer"
          element={
            <ProtectedRoute>
              <OrganizerAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Messages Route */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/console"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminConsole />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/monetization"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminMonetization />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Agency Dashboard */}
        <Route
          path="/agency"
          element={
            <ProtectedRoute requiredRole="sponsor">
              <AgencyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

/**
 * App - Main application component
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <BillingProvider>
            <AppContent />
            <Toaster position="top-right" />
          </BillingProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
