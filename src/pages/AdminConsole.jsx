import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../layouts';
import { Button } from '../components/FormElements';
import { Card, Badge, Tabs } from '../components/UI';
import toast from 'react-hot-toast';
import {
  pendingUserApprovals,
  pendingListingApprovals,
  mockDisputes,
} from '../data/mockData';

/**
 * AdminConsole - Platform control center for admins
 * User approvals, listing approvals, dispute management
 */
export const AdminConsole = () => {
  const { user } = useAuth();

  // Only admins can access
  if (user?.role !== 'admin') {
    return (
      <MainLayout>
        <div className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Access Denied
            </h2>
            <p className="text-neutral-600">
              Only admins can access the admin console
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const [pendingUsers, setPendingUsers] = useState(pendingUserApprovals);
  const [pendingListings, setPendingListings] = useState(pendingListingApprovals);
  const [disputes, setDisputes] = useState(mockDisputes);

  const handleApproveUser = (userId) => {
    setPendingUsers(pendingUsers.filter((u) => u.id !== userId));
    toast.success('User approved');
  };

  const handleRejectUser = (userId) => {
    setPendingUsers(pendingUsers.filter((u) => u.id !== userId));
    toast.success('User rejected');
  };

  const handleApproveListing = (listingId) => {
    setPendingListings(pendingListings.filter((l) => l.id !== listingId));
    toast.success('Listing approved');
  };

  const handleRejectListing = (listingId) => {
    setPendingListings(pendingListings.filter((l) => l.id !== listingId));
    toast.success('Listing rejected');
  };

  const handleResolveDispute = (disputeId) => {
    setDisputes(disputes.filter((d) => d.id !== disputeId));
    toast.success('Dispute resolved');
  };

  const tabs = [
    {
      label: `User Approvals (${pendingUsers.length})`,
      content: (
        <div className="space-y-4">
          {pendingUsers.length === 0 ? (
            <Card size="lg" className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-neutral-600">No pending user approvals</p>
            </Card>
          ) : (
            pendingUsers.map((user) => (
              <Card key={user.id} size="lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Name</p>
                    <p className="text-neutral-900 font-bold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Email</p>
                    <p className="text-neutral-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Role</p>
                    <Badge variant="primary">{user.role}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Applied</p>
                    <p className="text-neutral-900">{user.appliedAt}</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mb-4">
                  <strong>Details:</strong>{' '}
                  {user.industry ||
                    user.organizationType ||
                    'No additional details'}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleApproveUser(user.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleRejectUser(user.id)}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      ),
    },
    {
      label: `Listing Approvals (${pendingListings.length})`,
      content: (
        <div className="space-y-4">
          {pendingListings.length === 0 ? (
            <Card size="lg" className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-neutral-600">No pending event listings</p>
            </Card>
          ) : (
            pendingListings.map((listing) => (
              <Card key={listing.id} size="lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Event</p>
                    <p className="text-neutral-900 font-bold">
                      {listing.eventName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">
                      Organizer
                    </p>
                    <p className="text-neutral-900">{listing.organizerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Date</p>
                    <p className="text-neutral-900">{listing.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">
                      Location
                    </p>
                    <p className="text-neutral-900">{listing.location}</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mb-4">
                  <strong>Category:</strong> {listing.category}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleApproveListing(listing.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleRejectListing(listing.id)}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      ),
    },
    {
      label: `Disputes (${disputes.length})`,
      content: (
        <div className="space-y-4">
          {disputes.length === 0 ? (
            <Card size="lg" className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-neutral-600">No active disputes</p>
            </Card>
          ) : (
            disputes.map((dispute) => (
              <Card key={dispute.id} size="lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      {dispute.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Proposal: {dispute.proposalId}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        dispute.priority === 'high'
                          ? 'error'
                          : 'warning'
                      }
                    >
                      {dispute.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="warning">{dispute.status}</Badge>
                  </div>
                </div>

                <p className="text-neutral-700 mb-4">{dispute.description}</p>

                <p className="text-sm text-neutral-600 mb-4">
                  <strong>Type:</strong> {dispute.type} • <strong>Filed:</strong>{' '}
                  {dispute.createdAt}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleResolveDispute(dispute.id)}
                    className="flex-1"
                  >
                    Resolve Dispute
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Admin Console
          </h1>
          <p className="text-neutral-600">
            Platform management, approvals, and dispute resolution
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/admin/analytics">
            <Card size="lg" className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Analytics</h3>
                  <p className="text-sm text-neutral-600">View platform metrics</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/monetization">
            <Card size="lg" className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Monetization</h3>
                  <p className="text-sm text-neutral-600">Configure plans & rates</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/users">
            <Card size="lg" className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Users</h3>
                  <p className="text-sm text-neutral-600">Manage platform users</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default AdminConsole;
