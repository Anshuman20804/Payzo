'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BalanceCard from '@/components/dashboard/BalanceCard';
import ActionButtons from '@/components/dashboard/ActionButtons';
import TransactionList from '@/components/dashboard/TransactionList';
import AddMoneyModal from '@/components/modals/AddMoneyModal';
import SendMoneyModal from '@/components/modals/SendMoneyModal';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
  method?: string;
}

export default function PersonalDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  
  const [balance, setBalance] = useState(2500);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 1500,
      description: 'Salary Payment',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'success',
      method: 'Bank Transfer'
    },
    {
      id: '2',
      type: 'debit',
      amount: 850,
      description: 'Grocery Shopping',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'success',
      method: 'UPI Payment'
    }
  ]);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'personal')) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, user, router]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-primary font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'personal') {
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Personal Dashboard</h1>
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
            <div className="text-2xl font-bold text-primary mb-1">₹{balance.toLocaleString()}</div>
            <div className="text-sm text-secondary">Available Balance</div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{transactions.length}</div>
            <div className="text-sm text-secondary">Total Transactions</div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">
              ₹{transactions
                .filter(t => t.type === 'credit')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-secondary">Money Received</div>
          </div>
        </div>
        
        <BalanceCard balance={balance} />
        
        <ActionButtons
          balance={balance}
          isProcessing={isProcessing}
          onAddMoney={() => setShowAddMoneyModal(true)}
          onSendMoney={() => setShowSendMoneyModal(true)}
        />
        
        <TransactionList transactions={transactions} />

        <AddMoneyModal 
          isOpen={showAddMoneyModal}
          onClose={() => setShowAddMoneyModal(false)}
          onSuccess={(amount, bank) => {
            setBalance(prev => prev + amount);
            addTransaction({
              type: 'credit',
              amount,
              description: `Added money from ${bank}`,
              status: 'success',
              method: bank
            });
          }}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />

        <SendMoneyModal 
          isOpen={showSendMoneyModal}
          onClose={() => setShowSendMoneyModal(false)}
          onSuccess={(amount, recipient) => {
            setBalance(prev => prev - amount);
            addTransaction({
              type: 'debit',
              amount,
              description: `Sent to ${recipient}`,
              status: 'success',
              method: 'Payzo Wallet'
            });
          }}
          balance={balance}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </div>
    </div>
  );
}
