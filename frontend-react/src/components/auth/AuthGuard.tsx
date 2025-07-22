import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useAuthContext } from '@/context/AuthContext';
import { shouldBypassAuth, isDevelopment } from '@/config/env';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, isInitialized } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const bypassAuth = shouldBypassAuth();

  useEffect(() => {
    // Log bypass info in development
    if (isDevelopment && bypassAuth) {
      console.log('🚫 Auth bypass enabled - skipping authentication checks');
    }

    // If auth is bypassed, don't enforce authentication
    if (bypassAuth) {
      return;
    }

    // Wait for auth to initialize
    if (!isInitialized) {
      return;
    }

    // If user data is still loading, don't redirect (login transition)
    if (isLoading) {
      return;
    }

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate({
        to: '/login',
        replace: true
      });
    }
  }, [isAuthenticated, isLoading, isInitialized, location.pathname, navigate, bypassAuth]);

  // If auth is bypassed, always show content
  if (bypassAuth) {
    return <>{children}</>;
  }

  // Show loading state while initializing or when user data is loading
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {!isInitialized ? 'Loading...' : 'Authenticating...'}
          </p>
        </div>
      </div>
    );
  }

  // If on login page, always show content
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  // If authenticated, show protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Fallback - should not reach here due to useEffect redirect
  return null;
}
