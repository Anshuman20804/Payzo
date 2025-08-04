'use client';

import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">Welcome to Payzo</h1>
          <p className="text-xl text-secondary leading-relaxed">Choose your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/auth/personal" className="group">
            <div className="glass-morphism rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3">Personal Account</h3>
                <p className="text-secondary mb-6 leading-relaxed">Perfect for individuals who want to send money, pay bills, and manage personal finances.</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Send & receive money instantly</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Pay bills & manage wallet</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Track all transactions</span>
                  </div>
                </div>
                
                <button className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Get Started Personal
                </button>
              </div>
            </div>
          </Link>

          <Link href="/auth/merchant" className="group">
            <div className="glass-morphism rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3">Business Account</h3>
                <p className="text-secondary mb-6 leading-relaxed">Ideal for businesses to accept payments, manage transactions, and grow revenue.</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Accept customer payments</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Real-time analytics</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-tertiary">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Instant settlements</span>
                  </div>
                </div>
                
                <button className="w-full py-4 px-6 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Get Started Business
                </button>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-secondary">Demo Mode Active • Use any credentials</span>
          </div>
        </div>
      </div>
    </div>
  );
}
