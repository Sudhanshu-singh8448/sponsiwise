import React, { useState, useMemo } from 'react';
import {
  Send,
  Search,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Button, Input } from '../components/FormElements';
import { Card } from '../components/UI';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/helpers';

/**
 * Messages - Communication hub for deal discussions
 * Thread-based messaging between sponsors and organizers
 */
export const Messages = () => {
  const { user } = useAuth();
  const { getMessages, sendMessage, proposals, markMessageAsRead, events } =
    useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);

  // Get all messages for this user
  const userMessages = useMemo(() => {
    return getMessages().filter(
      (m) => m.senderId === user?.id || m.recipientId === user?.id
    );
  }, [user?.id, getMessages]);

  // Group messages by proposal
  const threads = useMemo(() => {
    const threadMap = {};

    userMessages.forEach((msg) => {
      const proposal = proposals.find((p) => p.id === msg.proposalId);
      const event = proposal ? events.find((e) => e.id === proposal.eventId) : null;

      if (!threadMap[msg.proposalId]) {
        threadMap[msg.proposalId] = {
          proposalId: msg.proposalId,
          proposal,
          event,
          messages: [],
          unreadCount: 0,
        };
      }

      threadMap[msg.proposalId].messages.push(msg);

      if (msg.recipientId === user?.id && !msg.read) {
        threadMap[msg.proposalId].unreadCount++;
      }
    });

    // Filter by search and sort by last message
    return Object.values(threadMap)
      .filter((thread) => {
        if (!searchQuery) return true;
        const eventName = thread.event?.name.toLowerCase() || '';
        return eventName.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const aLastMsg = a.messages[a.messages.length - 1];
        const bLastMsg = b.messages[b.messages.length - 1];
        return new Date(bLastMsg?.timestamp) - new Date(aLastMsg?.timestamp);
      });
  }, [userMessages, proposals, events, searchQuery, user?.id]);

  const currentThread = selectedThread
    ? threads.find((t) => t.proposalId === selectedThread)
    : null;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim() || !currentThread) {
      toast.error('Please select a thread and enter a message');
      return;
    }

    setLoading(true);
    try {
      const recipientId =
        currentThread.proposal.sponsorId === user.id
          ? currentThread.proposal.sponsorId === user.id
            ? Object.values(proposals).find(
                (p) => p.id === currentThread.proposalId
              )?.sponsorId
            : currentThread.proposal.sponsorId
          : currentThread.proposal.sponsorId === user.id
          ? currentThread.event?.organizerId
          : currentThread.proposal.sponsorId;

      await sendMessage({
        senderId: user.id,
        recipientId:
          recipientId ||
          (user.role === 'sponsor'
            ? currentThread.event?.organizerId
            : currentThread.proposal.sponsorId),
        proposalId: currentThread.proposalId,
        message: messageText,
      });

      setMessageText('');
      toast.success('Message sent');
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleThreadSelect = (proposalId) => {
    setSelectedThread(proposalId);
    // Mark messages as read
    currentThread?.messages.forEach((msg) => {
      if (msg.recipientId === user?.id && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Messages</h1>
          <p className="text-neutral-600">
            Discuss sponsorship proposals with event organizers and sponsors
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Thread List */}
          <div className="lg:col-span-1 flex flex-col">
            <Card size="lg" className="flex-1 flex flex-col overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-neutral-200">
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Thread List */}
              <div className="flex-1 overflow-y-auto">
                {threads.length === 0 ? (
                  <div className="p-4 text-center text-neutral-600">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-200">
                    {threads.map((thread) => {
                      const lastMessage =
                        thread.messages[thread.messages.length - 1];
                      const isSelected = selectedThread === thread.proposalId;

                      return (
                        <button
                          key={thread.proposalId}
                          onClick={() => handleThreadSelect(thread.proposalId)}
                          className={`w-full text-left p-4 transition-colors hover:bg-neutral-50 ${
                            isSelected ? 'bg-primary-50 border-l-4 border-primary-600' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-neutral-900 truncate">
                                {thread.event?.name || 'Unknown Event'}
                              </p>
                              <p className="text-sm text-neutral-600 truncate mt-1">
                                {lastMessage?.message || 'No messages'}
                              </p>
                            </div>
                            {thread.unreadCount > 0 && (
                              <span className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                                {thread.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 mt-2">
                            {formatDateTime(lastMessage?.timestamp)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Message View */}
          <div className="lg:col-span-2 flex flex-col">
            {currentThread ? (
              <Card size="lg" className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-neutral-200">
                  <h2 className="text-lg font-bold text-neutral-900">
                    {currentThread.event?.name}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Proposal #{currentThread.proposalId.slice(0, 8)}...
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentThread.messages.length === 0 ? (
                    <div className="text-center text-neutral-600 py-8">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    currentThread.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderId === user.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.senderId === user.id
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-200 text-neutral-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderId === user.id
                                ? 'text-primary-100'
                                : 'text-neutral-600'
                            }`}
                          >
                            {formatDateTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Compose */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-neutral-200 flex gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Card>
            ) : (
              <Card size="lg" className="flex items-center justify-center text-center">
                <div>
                  <MessageCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600">
                    Select a conversation to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
