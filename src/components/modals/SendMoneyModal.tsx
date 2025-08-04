import { useState } from 'react';
import Modal from '../ui/Modal';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, recipient: string) => void;
  balance: number;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function SendMoneyModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  balance, 
  isProcessing, 
  setIsProcessing 
}: SendMoneyModalProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  
  const quickRecipients = [
    { 
      name: 'Narendra Modi', 
      avatar: 'N',
      color: '#0EA5E9', 
      status: 'online',
      lastSent: '₹5,000 yesterday'
    },
    { 
      name: 'Rahul Gandhi', 
      avatar: 'R',
      color: '#F97316',
      status: 'offline',
      lastSent: '₹2,500 last week'
    },
    { 
      name: 'Arvind Kejriwal', 
      avatar: 'A',
      color: '#A855F7',
      status: 'online',
      lastSent: '₹1,500 today'
    },
    { 
      name: 'Mamata Banerjee', 
      avatar: 'M',
      color: '#10B981',
      status: 'offline',
      lastSent: '₹3,000 2 days ago'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient || isProcessing) return;
    
    const numAmount = parseInt(amount);
    if (numAmount < 1 || numAmount > balance) return;

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (Math.random() > 0.02) {
      onSuccess(numAmount, recipient);
      setAmount('');
      setRecipient('');
      onClose();
    } else {
      alert('Transaction failed. Please try again.');
    }
    
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setAmount('');
      setRecipient('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Money">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full h-14 pl-12 pr-4 text-lg font-medium bg-surface-secondary/80 rounded-2xl focus:outline-none focus:bg-surface-tertiary/90 text-primary placeholder-tertiary/50 transition-colors ring-1 ring-black/5 focus:ring-2 focus:ring-primary-500/20"
              placeholder="Search by name or phone"
              disabled={isProcessing}
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4">
              <svg className="w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-tertiary mb-4">Recent Recipients</h3>
            <div className="space-y-3">
              {quickRecipients.map((contact) => (
                <button
                  key={contact.name}
                  type="button"
                  onClick={() => setRecipient(contact.name)}
                  disabled={isProcessing}
                  className={`group w-full p-4 rounded-2xl transition-all duration-200 ring-1 ${
                    recipient === contact.name
                      ? 'bg-surface-tertiary/90 ring-primary-500/30'
                      : 'bg-surface-secondary/80 hover:bg-surface-tertiary/90 ring-black/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg"
                        style={{ backgroundColor: contact.color }}
                      >
                        {contact.avatar}
                      </div>
                      <div 
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface-primary ${
                          contact.status === 'online' ? 'bg-success-500' : 'bg-tertiary'
                        }`}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-semibold text-primary truncate">{contact.name}</p>
                      <p className="text-sm text-tertiary truncate">{contact.lastSent}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        recipient === contact.name
                          ? 'border-primary bg-primary'
                          : 'border-tertiary group-hover:border-primary'
                      }`}>
                        {recipient === contact.name && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-tertiary">Enter Amount</h3>
            <span className="text-sm font-medium text-tertiary">Balance: ₹{balance.toLocaleString()}</span>
          </div>
          
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-6">
              <span className="text-3xl font-bold text-primary">₹</span>
            </div>
            <input
              type="number"
              min="1"
              max={balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-6 h-20 text-4xl font-bold bg-surface-secondary/80 rounded-2xl focus:outline-none focus:bg-surface-tertiary/90 text-primary placeholder-tertiary/50 transition-colors ring-1 ring-black/5 focus:ring-2 focus:ring-primary-500/20"
              placeholder="0"
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            {[100, 500, 1000, 2000].map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount.toString())}
                disabled={isProcessing || quickAmount > balance}
                className="flex-1 py-2 rounded-xl bg-surface-secondary/80 hover:bg-surface-tertiary/90 text-sm font-medium text-primary transition-colors disabled:opacity-50 ring-1 ring-black/5"
              >
                ₹{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
            
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isProcessing}
            className="flex-1 h-14 rounded-2xl bg-surface-secondary/80 hover:bg-surface-tertiary/90 text-primary font-medium transition-colors disabled:opacity-50 ring-1 ring-black/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!amount || !recipient || isProcessing || parseInt(amount) > balance}
            className="flex-1 h-14 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Send ₹${amount ? parseInt(amount).toLocaleString() : '0'}`
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
