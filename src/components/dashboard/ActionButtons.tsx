import Button from '../ui/Button';
import Card from '../ui/Card';

interface ActionButtonsProps {
  balance: number;
  isProcessing: boolean;
  onAddMoney: () => void;
  onSendMoney: () => void;
}

export default function ActionButtons({ 
  balance, 
  isProcessing, 
  onAddMoney, 
  onSendMoney
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card padding="lg" className="text-center group hover:scale-105 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">Add Money</h3>
        <p className="text-sm text-secondary mb-4">Top up from your bank account</p>
        <Button 
          onClick={onAddMoney}
          disabled={isProcessing}
          className="w-full"
        >
          Add Money
        </Button>
      </Card>

      <Card padding="lg" className="text-center group hover:scale-105 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">Send Money</h3>
        <p className="text-sm text-secondary mb-4">
          {balance === 0 ? 'Add money first to send' : 'Transfer to friends & family'}
        </p>
        <Button 
          onClick={onSendMoney}
          disabled={isProcessing || balance === 0}
          variant={balance === 0 ? 'outline' : 'primary'}
          className="w-full"
        >
          Send Money
        </Button>
      </Card>
    </div>
  );
}
