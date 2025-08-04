'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WebGLBackground from '@/components/WebGLBackground';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'personal') {
        router.push('/dashboard/personal');
      } else if (user.role === 'business') {
        router.push('/dashboard/business');
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

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

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <WebGLBackground />
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6" style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Payzo
        </h1>
        <p className="text-xl text-secondary mb-8">
          A digital payment platform demo for personal and business users
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/auth" className="group">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              Try Demo
            </button>
          </Link>
        </div>

        <div className="glass-morphism rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Demo Credentials</h2>
          <div className="text-sm text-secondary space-y-2">
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
            <p className="text-xs mt-4">Works for both Personal and Business accounts</p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
