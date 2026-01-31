import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockEvents, mockProposals, mockMessages } from '../data/mockData';

/**
 * MarketplaceContext - Manages events, proposals, and marketplace data
 */
const MarketplaceContext = createContext();

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
};

export const MarketplaceProvider = ({ children }) => {
  const [events, setEvents] = useState(mockEvents);
  const [proposals, setProposals] = useState(mockProposals);
  const [messages, setMessages] = useState(mockMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get all events
   */
  const getEvents = useCallback(() => {
    return events;
  }, [events]);

  /**
   * Get event by ID
   */
  const getEventById = useCallback(
    (eventId) => {
      return events.find((e) => e.id === eventId);
    },
    [events]
  );

  /**
   * Create new event
   */
  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newEvent = {
        id: `event-${Date.now()}`,
        ...eventData,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setEvents((prev) => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update event
   */
  const updateEvent = useCallback(async (eventId, updates) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, ...updates } : e))
      );

      return getEventById(eventId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getEventById]);

  /**
   * Get proposals
   */
  const getProposals = useCallback(
    (filter = {}) => {
      let filtered = proposals;

      if (filter.eventId) {
        filtered = filtered.filter((p) => p.eventId === filter.eventId);
      }

      if (filter.sponsorId) {
        filtered = filtered.filter((p) => p.sponsorId === filter.sponsorId);
      }

      if (filter.status) {
        filtered = filtered.filter((p) => p.status === filter.status);
      }

      return filtered;
    },
    [proposals]
  );

  /**
   * Get proposal by ID
   */
  const getProposalById = useCallback(
    (proposalId) => {
      return proposals.find((p) => p.id === proposalId);
    },
    [proposals]
  );

  /**
   * Create proposal
   */
  const createProposal = useCallback(async (proposalData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newProposal = {
        id: `proposal-${Date.now()}`,
        ...proposalData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProposals((prev) => [...prev, newProposal]);
      return newProposal;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update proposal status
   */
  const updateProposalStatus = useCallback(
    async (proposalId, status) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId
              ? { ...p, status, updatedAt: new Date().toISOString() }
              : p
          )
        );

        return getProposalById(proposalId);
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getProposalById]
  );

  /**
   * Get messages
   */
  const getMessages = useCallback(
    (filter = {}) => {
      let filtered = messages;

      if (filter.proposalId) {
        filtered = filtered.filter((m) => m.proposalId === filter.proposalId);
      }

      if (filter.senderId) {
        filtered = filtered.filter((m) => m.senderId === filter.senderId);
      }

      return filtered.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    },
    [messages]
  );

  /**
   * Send message
   */
  const sendMessage = useCallback(async (messageData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMessage = {
        id: `msg-${Date.now()}`,
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
      };

      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mark message as read
   */
  const markMessageAsRead = useCallback((messageId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  }, []);

  /**
   * Add negotiation message to proposal
   */
  const addNegotiationMessage = useCallback(
    async (proposalId, negotiationData) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setProposals((prev) =>
          prev.map((p) => {
            if (p.id === proposalId) {
              const negotiations = p.negotiations || [];
              return {
                ...p,
                negotiations: [
                  ...negotiations,
                  {
                    id: `neg-${Date.now()}`,
                    ...negotiationData,
                    timestamp: new Date().toISOString(),
                  },
                ],
                updatedAt: new Date().toISOString(),
              };
            }
            return p;
          })
        );

        return getProposalById(proposalId);
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getProposalById]
  );

  /**
   * Update proposal with history entry
   */
  const updateProposalWithHistory = useCallback(
    async (proposalId, updates) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        setProposals((prev) =>
          prev.map((p) => {
            if (p.id === proposalId) {
              const history = p.history || [];
              return {
                ...p,
                ...updates,
                history: [
                  ...history,
                  {
                    timestamp: new Date().toISOString(),
                    status: updates.status || p.status,
                    action: 'status_change',
                    changedBy: updates.changedBy || 'system',
                    notes: updates.notes || 'Status updated',
                  },
                ],
                updatedAt: new Date().toISOString(),
              };
            }
            return p;
          })
        );

        return getProposalById(proposalId);
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getProposalById]
  );

  const value = {
    events,
    proposals,
    messages,
    loading,
    error,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    getProposals,
    getProposalById,
    createProposal,
    updateProposalStatus,
    updateProposalWithHistory,
    addNegotiationMessage,
    getMessages,
    sendMessage,
    markMessageAsRead,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceContext;
