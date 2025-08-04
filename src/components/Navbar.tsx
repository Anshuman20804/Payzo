'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const getNavItems = () => {
    if (isAuthenticated && user) {
      return [
        { href: "/", label: "Home" },
        { 
          href: user.role === 'personal' ? '/dashboard/personal' : '/dashboard/business', 
          label: "Dashboard" 
        },
      ];
    }
    return [
      { href: "/", label: "Home" },
      { href: "/auth", label: "Login" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-morphism rounded-full px-6 py-3 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
            Payzo
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary-500 text-white shadow-lg glow'
                    : 'text-secondary hover:text-primary hover:bg-surface-elevated'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {isAuthenticated && user && (
            <button
              onClick={logout}
              className="px-3 py-1 text-sm text-secondary hover:text-primary transition-colors"
            >
              Logout
            </button>
          )}
          
          <button
            onClick={toggleTheme}
            className="relative w-8 h-8 flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:bg-surface-elevated rounded-full p-0"
            aria-label="Toggle theme"
          >
            <svg 
              className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-700 ease-in-out m-auto ${
                theme === 'light' 
                  ? 'rotate-0 opacity-100 scale-100' 
                  : 'rotate-180 opacity-0 scale-75'
              }`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
            </svg>
            
            <svg 
              className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-700 ease-in-out m-auto ${
                theme === 'dark' 
                  ? 'rotate-0 opacity-100 scale-100' 
                  : '-rotate-180 opacity-0 scale-75'
              }`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
