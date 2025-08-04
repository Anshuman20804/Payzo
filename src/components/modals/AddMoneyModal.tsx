import { useState } from 'react';
import Modal from '../ui/Modal';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, bank: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function AddMoneyModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  isProcessing, 
  setIsProcessing 
}: AddMoneyModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  
  const banks = [
    { 
      name: 'HDFC Bank', 
      color: '#003C8F', 
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 0v14h14V5H6z" />
          <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2z" />
        </svg>
      )
    },
    { 
      name: 'Axis Bank', 
      color: '#C41E3A',
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 5H5v14h14V5zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          <path d="M12 16l-4-4h8l-4 4z" />
        </svg>
      )
    },
    { 
      name: 'SBI', 
      color: '#1C468C',
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v12M8 12h8" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
      )
    },
    { 
      name: 'ICICI Bank', 
      color: '#EE7203',
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2zM15 9l-6 6M9 9l6 6" />
        </svg>
      )
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !selectedBank || isProcessing) return;
    
    const numAmount = parseInt(amount);
    if (numAmount < 100 || numAmount > 50000) return;

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    if (Math.random() > 0.05) {
      onSuccess(numAmount, selectedBank);
      setAmount('');
      setSelectedBank('');
      onClose();
    } else {
      alert('Transaction failed. Please try again.');
    }
    
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setAmount('');
      setSelectedBank('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Money">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-6">
              <span className="text-3xl font-bold text-primary">₹</span>
            </div>
            <input
              type="number"
              min="100"
              max="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-6 h-20 text-4xl font-bold bg-surface-secondary/80 rounded-2xl focus:outline-none focus:bg-surface-tertiary/90 text-primary placeholder-tertiary/50 transition-colors ring-1 ring-black/5 focus:ring-2 focus:ring-primary-500/20"
              placeholder="0"
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            {[500, 1000, 2000, 5000].map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount.toString())}
                className="flex-1 py-2 rounded-xl bg-surface-secondary/80 hover:bg-surface-tertiary/90 text-sm font-medium text-primary transition-colors ring-1 ring-black/5"
              >
                ₹{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-tertiary mb-3">Select Bank Account</h3>
          <div className="grid grid-cols-2 gap-3">
            {banks.map((bank) => (
              <button
                key={bank.name}
                type="button"
                onClick={() => setSelectedBank(bank.name)}
                disabled={isProcessing}
                className={`group relative p-4 rounded-2xl transition-all duration-200 ring-1 ring-black/5 ${
                  selectedBank === bank.name
                    ? 'bg-surface-tertiary/90 ring-primary-500/30'
                    : 'bg-surface-secondary/80 hover:bg-surface-tertiary/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      selectedBank === bank.name ? 'text-white' : 'text-primary group-hover:text-white'
                    }`}
                    style={{ backgroundColor: selectedBank === bank.name ? bank.color : 'transparent' }}
                  >
                    {bank.logo}
                  </div>
                  
                  <span className="font-medium text-primary">{bank.name}</span>
                  
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors ${
                    selectedBank === bank.name
                      ? 'border-primary bg-primary'
                      : 'border-tertiary group-hover:border-primary'
                  }`}>
                    {selectedBank === bank.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
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
            disabled={!amount || !selectedBank || isProcessing}
            className="flex-1 h-14 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Add ₹${amount ? parseInt(amount).toLocaleString() : '0'}`
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
