'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  type: 'credit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
  method?: string;
  customer: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  lastPurchase: Date;
}

export default function BusinessDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  
  const [revenue, setRevenue] = useState(125000);
  const [todayRevenue, setTodayRevenue] = useState(8500);
  const [pendingAmount] = useState(2500);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 1200,
      description: 'Product Purchase',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success',
      method: 'Credit Card',
      customer: 'Amitabh Bachchan'
    },
    {
      id: '2',
      type: 'credit',
      amount: 850,
      description: 'Service Payment',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'success',
      method: 'UPI',
      customer: 'Deepika Padukone'
    },
    {
      id: '3',
      type: 'credit',
      amount: 3500,
      description: 'Bulk Order',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'pending',
      method: 'Bank Transfer',
      customer: 'Shah Rukh Khan'
    }
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Amitabh Bachchan',
      email: 'amitabh@example.com',
      totalSpent: 15600,
      lastPurchase: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Deepika Padukone',
      email: 'deepika@example.com',
      totalSpent: 8900,
      lastPurchase: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Shah Rukh Khan',
      email: 'srk@example.com',
      totalSpent: 45200,
      lastPurchase: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'business')) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, user, router]);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 5000) + 500;
      const customerNames = ['Aishwarya Rai', 'Priyanka Chopra', 'Hrithik Roshan', 'Katrina Kaif'];
      const customer = customerNames[Math.floor(Math.random() * customerNames.length)];
      
      setRevenue(prev => prev + amount);
      setTodayRevenue(prev => prev + amount);
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'credit',
        amount,
        description: 'New Customer Payment',
        timestamp: new Date(),
        status: 'success',
        method: 'Payzo Payment',
        customer
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setIsProcessing(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-secondary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-primary font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'business') {
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Business Dashboard</h1>
            <p className="text-secondary">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-secondary hover:text-primary transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">₹{revenue.toLocaleString()}</div>
            <div className="text-sm text-secondary">Total Revenue</div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">₹{todayRevenue.toLocaleString()}</div>
            <div className="text-sm text-secondary">Today&apos;s Revenue</div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">₹{pendingAmount.toLocaleString()}</div>
            <div className="text-sm text-secondary">Pending Amount</div>
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Ready to Accept Payments</h3>
          <p className="text-secondary mb-6">Your merchant account is active and ready to receive payments</p>
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="px-8 py-4 bg-gradient-to-r from-success-500 to-success-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-70"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              'Simulate Customer Payment'
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-6">Recent Payments</h2>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-surface-tertiary scrollbar-track-surface-secondary hover:scrollbar-thumb-surface-primary">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="glass-morphism rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-success-100 text-success-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">{transaction.description}</h4>
                        <p className="text-sm text-tertiary">
                          {transaction.customer} • {transaction.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-success-600">
                        +₹{transaction.amount.toLocaleString()}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'success' ? 'text-success-600 bg-success-100' :
                        transaction.status === 'pending' ? 'text-amber-600 bg-amber-100' :
                        'text-danger-600 bg-danger-100'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
              
          <div>
            <h2 className="text-xl font-semibold text-primary mb-6">Top Customers</h2>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-surface-tertiary scrollbar-track-surface-secondary hover:scrollbar-thumb-surface-primary">
              {customers.map((customer) => (
                <div key={customer.id} className="glass-morphism rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">{customer.name}</h4>
                        <p className="text-sm text-tertiary">{customer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">
                        ₹{customer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-sm text-tertiary">Total Spent</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
