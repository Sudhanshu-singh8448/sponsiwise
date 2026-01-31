import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Routes that require authentication
 */
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !Array.isArray(requiredRole) && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    requiredRole &&
    Array.isArray(requiredRole) &&
    !requiredRole.includes(user?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

/**
 * RoleGate - Conditionally render content based on user role
 */
export const RoleGate = ({ requiredRole, children, fallback = null }) => {
  const { user } = useAuth();

  if (!user) return fallback;

  if (Array.isArray(requiredRole)) {
    if (!requiredRole.includes(user.role)) return fallback;
  } else {
    if (user.role !== requiredRole) return fallback;
  }

  return children;
};

export default ProtectedRoute;
