import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Infer the return type of useAuth to type our context
type AuthContextType = ReturnType<typeof useAuth>;

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * The AuthProvider component calls the useAuth hook once and provides its
 * state and functions to all descendant components via the AuthContext.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to easily access the authentication context.
 * This ensures that any component using this hook is a descendant of AuthProvider.
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
