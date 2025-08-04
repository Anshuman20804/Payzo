interface ModeToggleProps {
  isUserMode: boolean;
  onModeChange: (isUserMode: boolean) => void;
}

export default function ModeToggle({ isUserMode, onModeChange }: ModeToggleProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary">
            {isUserMode ? 'Personal Dashboard' : 'Business Dashboard'}
          </h2>
          <p className="text-secondary">
            {isUserMode 
              ? 'Manage your personal finances and payments' 
              : 'Track customer payments and business transactions'
            }
          </p>
        </div>
        
        <div className="bg-surface-elevated rounded-xl p-1 flex shadow-lg">
          <button
            onClick={() => onModeChange(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isUserMode 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'text-secondary hover:text-primary hover:bg-surface-primary'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => onModeChange(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              !isUserMode 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'text-secondary hover:text-primary hover:bg-surface-primary'
            }`}
          >
            Business
          </button>
        </div>
      </div>
              
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {isUserMode ? '0' : '₹0'}
          </div>
          <div className="text-sm text-secondary">
            {isUserMode ? 'Total Spent' : 'Today\'s Revenue'}
          </div>
        </div>
        
        <div className="bg-surface-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {isUserMode ? '0' : '0'}
          </div>
          <div className="text-sm text-secondary">
            {isUserMode ? 'Transactions' : 'Orders Today'}
          </div>
        </div>
        
        <div className="bg-surface-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {isUserMode ? '₹0' : '₹0'}
          </div>
          <div className="text-sm text-secondary">
            {isUserMode ? 'Available Balance' : 'Pending Amount'}
          </div>
        </div>
      </div>
    </div>
  );
}
