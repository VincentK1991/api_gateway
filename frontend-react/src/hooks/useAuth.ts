import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import {
  signUp,
  login,
  refresh,
  logOut
} from '@/api/authService';
import type {
  LoginRequest,
  RegisterRequest
} from '@/types/User';

// Query keys for TanStack Query
export const AUTH_QUERY_KEYS = {
  refresh: ['auth', 'refresh'] as const, // Single query that handles both token refresh and user data
} as const;

// Cookie-based authentication - no token management needed
const REFRESH_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

export function useAuth() {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldAutoRefresh, setShouldAutoRefresh] = useState(false);

  // Single query that both refreshes token AND gets user data
  const refreshQuery = useQuery({
    queryKey: AUTH_QUERY_KEYS.refresh, // Using refresh key since that's what we're calling
    queryFn: refresh,
    enabled: isInitialized, // Always enabled when initialized
    refetchInterval: shouldAutoRefresh ? REFRESH_INTERVAL : false, // Stable state-based control
    refetchIntervalInBackground: true,
    refetchOnMount: false, // Don't refetch on component mount/navigation
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: (failureCount, error) => {
      // Stop retrying if we get a 401 (unauthorized) - token is likely expired
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 60 * 1000, // 1 minute (much shorter for refresh)
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: userError,
    refetch: refetchUser
  } = refreshQuery;

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: (data: RegisterRequest) => signUp(data),
    onSuccess: () => {
      // Cookies are set automatically, just invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.refresh });
      setShouldAutoRefresh(true); // Enable auto-refresh after successful signup
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: () => {
      // Cookies are set automatically, just invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.refresh });
      setShouldAutoRefresh(true); // Enable auto-refresh after successful login
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      handleSignOut();
    },
    onError: (error) => {
      console.error('Sign out failed:', error);
      // Even if the API call fails, we should clear local state
      handleSignOut();
    }
  });

  // Handle sign out - clear all auth data (cookies cleared by backend)
  const handleSignOut = useCallback(() => {
    setShouldAutoRefresh(false); // Disable auto-refresh on sign out
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.refresh });
    queryClient.clear(); // Clear all queries to ensure clean state
  }, [queryClient]);

  // Handle refresh/user errors (likely due to expired tokens)
  useEffect(() => {
    if (userError) {
      const userStatus = userError && typeof userError === 'object'
        ? (userError as { response?: { status?: number } })?.response?.status
        : undefined;

      if (userStatus === 401) {
        handleSignOut();
      }
    }
  }, [userError, handleSignOut]);

  // Control auto-refresh based on user authentication state
  useEffect(() => {
    if (user) {
      setShouldAutoRefresh(true); // User is authenticated, enable refresh
    } else if (userError) {
      setShouldAutoRefresh(false); // User is not authenticated, disable refresh
    }
  }, [user, userError]);

  // Initialize auth state
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Auth state helpers
  const isAuthenticated = !!user;
  const isLoading = !isInitialized || isLoadingUser;

  // Public API
  return {
    // User state
    user,
    isAuthenticated,
    isLoading,
    isInitialized,

    // Auth actions
    signUp: signUpMutation.mutate,
    login: loginMutation.mutate,
    signOut: signOutMutation.mutate,
    refetchUser, // This now refreshes both token and user data

    // Mutation states
    signUpState: {
      isLoading: signUpMutation.isPending,
      isError: signUpMutation.isError,
      error: signUpMutation.error,
      isSuccess: signUpMutation.isSuccess,
      reset: signUpMutation.reset
    },

    loginState: {
      isLoading: loginMutation.isPending,
      isError: loginMutation.isError,
      error: loginMutation.error,
      isSuccess: loginMutation.isSuccess,
      reset: loginMutation.reset
    },

    signOutState: {
      isLoading: signOutMutation.isPending,
      isError: signOutMutation.isError,
      error: signOutMutation.error,
      isSuccess: signOutMutation.isSuccess,
      reset: signOutMutation.reset
    },

    // Note: Token management is handled via HTTP-only cookies
    // No client-side token management needed
  };
}
