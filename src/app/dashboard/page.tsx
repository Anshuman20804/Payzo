export default function Dashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50/30 to-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">Dashboard</h1>
          <p className="text-neutral-600">Welcome to your Payzo wallet</p>
        </div>
        
        <div className="card p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Current Balance</h2>
              <p className="text-4xl font-bold gradient-text">₹1,25,000</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">Add Money</h3>
            <p className="text-neutral-600 mb-4">Add funds to your wallet instantly</p>
            <button className="btn-primary">Add Money</button>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">Send Money</h3>
            <p className="text-neutral-600 mb-4">Transfer funds to friends and family</p>
            <button className="btn-secondary">Send Money</button>
          </div>
        </div>
            
        <div className="card p-8">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Sent to Narendra Modi</p>
                  <p className="text-sm text-neutral-500">Today, 2:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-accent-600">-₹5,000</p>
                <p className="text-sm text-neutral-500">Completed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Added from Bank</p>
                  <p className="text-sm text-neutral-500">Yesterday, 4:15 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-secondary-600">+₹20,000</p>
                <p className="text-sm text-neutral-500">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
