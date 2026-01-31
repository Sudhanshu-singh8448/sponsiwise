import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockUsers, mockEvents, mockProposals } from '../data/mockData';

/**
 * AuthContext - Manages user authentication and authorization
 * Handles role-based access control (RBAC)
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login - Mock authentication
   * In production, this would call a backend API
   */
  const login = useCallback(async (email, password, role) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Find user by email and role
      let userData = Object.values(mockUsers).find((u) => u.email === email);

      if (!userData) {
        throw new Error('User not found');
      }

      // Override role if specified
      if (role && role !== userData.role) {
        userData = { ...userData, role };
      }

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register - Mock registration
   * In production, this would call a backend API
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        verified: false,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));

      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout - Clear user session
   */
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((role) => {
    if (Array.isArray(role)) {
      return role.includes(user?.role);
    }
    return user?.role === role;
  }, [user]);

  /**
   * Check if user has specific permission
   */
  const hasPermission = useCallback((permission) => {
    const rolePermissions = {
      admin: [
        'manage-users',
        'manage-events',
        'manage-deals',
        'view-analytics',
        'view-payments',
      ],
      sponsor: [
        'browse-events',
        'create-proposal',
        'manage-proposals',
        'view-analytics',
      ],
      organizer: [
        'create-event',
        'manage-event',
        'review-proposal',
        'manage-sponsorship',
        'view-analytics',
      ],
      agency: [
        'browse-events',
        'create-proposal',
        'manage-proposals',
        'manage-clients',
        'view-analytics',
      ],
    };

    return rolePermissions[user?.role]?.includes(permission) || false;
  }, [user]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback((updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, [user]);

  /**
   * Initialize auth from localStorage
   */
  const initializeAuth = useCallback(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
    hasPermission,
    updateProfile,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
