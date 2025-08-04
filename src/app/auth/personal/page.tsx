'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function PersonalLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(email, password, 'personal');
      if (success) {
        router.push('/dashboard/personal');
      } else {
        setError('Invalid credentials. Use admin/admin123');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
      
      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/auth" className="inline-flex items-center space-x-2 text-secondary hover:text-primary transition-colors mb-6 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Account Selection</span>
          </Link>
          
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-2">Personal Account</h1>
          <p className="text-secondary text-lg">{isLogin ? 'Welcome back! Sign in to continue' : 'Create your personal Payzo account'}</p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-primary">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-primary placeholder-tertiary transition-all duration-300 shadow-inner"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-2xl bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-primary placeholder-tertiary transition-all duration-300 shadow-inner"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-2xl bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-primary placeholder-tertiary transition-all duration-300 shadow-inner"
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="bg-danger-100 text-danger-600 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                isLogin ? 'Sign In to Account' : 'Create Personal Account'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-secondary">Demo Mode • Use admin/admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
