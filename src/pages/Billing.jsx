import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  CreditCard,
  Download,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBilling } from '../context/BillingContext';
import { MainLayout } from '../layouts';
import { Button } from '../components/FormElements';
import { Card, Badge } from '../components/UI';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '../utils/helpers';

/**
 * Billing - User's billing dashboard
 * Sponsors see payments made; Organizers see payouts; Admin sees all
 */
export const Billing = () => {
  const { user } = useAuth();
  const { getTransactions, getInvoices, getBillingSummary, processPayment, loading } =
    useBilling();

  const transactions = useMemo(
    () => getTransactions({ userId: user?.id }),
    [user?.id, getTransactions]
  );

  const invoices = useMemo(
    () => getInvoices({ userId: user?.id }),
    [user?.id, getInvoices]
  );

  const billingSummary = useMemo(
    () => getBillingSummary(user?.id, user?.role),
    [user?.id, user?.role, getBillingSummary]
  );

  const [processingInvoiceId, setProcessingInvoiceId] = React.useState(null);

  const handlePayInvoice = async (invoiceId) => {
    setProcessingInvoiceId(invoiceId);
    try {
      await processPayment(invoiceId);
      // Refresh would happen automatically via context update
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingInvoiceId(null);
    }
  };

  // Determine view based on role
  const isSponsor = user?.role === 'sponsor';
  const isOrganizer = user?.role === 'organizer';
  const isAdmin = user?.role === 'admin';

  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            {isSponsor ? 'Billing & Payments' : isOrganizer ? 'Payouts & Revenue' : 'Billing Dashboard'}
          </h1>
          <p className="text-neutral-600">
            {isSponsor
              ? 'Manage sponsorship invoices and payment history'
              : isOrganizer
              ? 'Track your event sponsorship revenue and payouts'
              : 'Platform-wide billing overview'}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isSponsor ? (
            <>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Total Payments</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {formatCurrency(billingSummary.paidAmount)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Pending</p>
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      {formatCurrency(billingSummary.pendingAmount)}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Total Invoices</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {billingSummary.invoiceCount}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-neutral-600 opacity-20" />
                </div>
              </Card>
            </>
          ) : isOrganizer ? (
            <>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Total Payouts</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {formatCurrency(billingSummary.paidAmount)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Pending Payouts</p>
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      {formatCurrency(billingSummary.pendingAmount)}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Active Deals</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {billingSummary.transactionCount}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-neutral-600 opacity-20" />
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {formatCurrency(billingSummary.totalAmount)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Transactions</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {billingSummary.transactionCount}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-neutral-600 opacity-20" />
                </div>
              </Card>
              <Card size="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Invoices</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-2">
                      {billingSummary.invoiceCount}
                    </p>
                  </div>
                  <Download className="w-8 h-8 text-neutral-600 opacity-20" />
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions/Payouts */}
          <div className="lg:col-span-2">
            <Card size="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {isSponsor ? 'Payment History' : 'Payout History'}
                </h2>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600">No transactions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left px-4 py-3 font-bold text-neutral-900">
                          Date
                        </th>
                        <th className="text-left px-4 py-3 font-bold text-neutral-900">
                          Type
                        </th>
                        <th className="text-left px-4 py-3 font-bold text-neutral-900">
                          Amount
                        </th>
                        <th className="text-left px-4 py-3 font-bold text-neutral-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr
                          key={txn.id}
                          className="border-b border-neutral-100 hover:bg-neutral-50"
                        >
                          <td className="px-4 py-3 text-neutral-900">
                            {formatDate(txn.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={txn.type === 'payment' ? 'warning' : 'success'}
                            >
                              {txn.type === 'payment' ? 'Payment' : 'Payout'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-bold text-neutral-900">
                            {formatCurrency(txn.amount)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={getStatusColor(txn.status)}>
                              {getStatusLabel(txn.status)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Invoices */}
          <div>
            <Card size="lg">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {isSponsor ? 'Invoices' : 'Invoice Details'}
              </h2>

              {invoices.length === 0 ? (
                <div className="text-center py-6">
                  <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600">No invoices</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="p-3 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-neutral-900">
                            {invoice.number}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {formatDate(invoice.issueDate)}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(invoice.status)}>
                          {getStatusLabel(invoice.status)}
                        </Badge>
                      </div>

                      <div className="border-t border-neutral-200 pt-2 mt-2">
                        <p className="text-sm text-neutral-600">
                          Amount:{' '}
                          <span className="font-bold text-neutral-900">
                            {formatCurrency(invoice.amount)}
                          </span>
                        </p>
                      </div>

                      {isSponsor && invoice.status === 'unpaid' && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handlePayInvoice(invoice.id)}
                          loading={processingInvoiceId === invoice.id}
                          className="w-full mt-3"
                        >
                          Pay Now
                        </Button>
                      )}

                      <button className="text-sm text-primary-600 hover:text-primary-700 w-full text-left mt-2 font-medium">
                        Download PDF →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Billing;
