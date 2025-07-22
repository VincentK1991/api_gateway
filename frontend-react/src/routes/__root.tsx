import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { DockBar } from '@/components/dock/DockBar'
import { useAuthContext } from '@/context/AuthContext'
import { shouldBypassAuth } from '@/config/env'

function RootComponent() {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();
  const bypassAuth = shouldBypassAuth();

  // Show DockBar when:
  // - Auth is bypassed (development mode), OR
  // - User is authenticated and not on login page
  const showDockBar = bypassAuth || (isAuthenticated && location.pathname !== '/login');

  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        <Outlet />
        {showDockBar && <DockBar />}
      </div>
      <TanStackRouterDevtools />
    </AuthGuard>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
})
