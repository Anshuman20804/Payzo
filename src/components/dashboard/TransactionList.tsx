import Card from '../ui/Card';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
  method?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success-600 bg-success-100';
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'failed': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (transactions.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-neutral-400 to-neutral-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">No Transactions Yet</h3>
        <p className="text-secondary">
          Start by adding money to your wallet
        </p>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-6">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} padding="md" className="hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'credit' 
                    ? 'bg-success-100 text-success-600' 
                    : 'bg-accent-100 text-accent-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {transaction.type === 'credit' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    )}
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{transaction.description}</h4>
                  <p className="text-sm text-tertiary">
                    {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    {transaction.method && ` • ${transaction.method}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  transaction.type === 'credit' ? 'text-success-600' : 'text-accent-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
