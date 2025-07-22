# Environment Configuration

This project uses Vite environment variables to configure the application for different environments.

## Environment Variables

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` | `https://api.yourapp.com` |
| `VITE_ENVIRONMENT` | Current environment | `development` | `production`, `staging` |
| `VITE_BYPASS_AUTH` | Skip authentication in development | `false` | `true` |

## Environment Files

Create these files in the root directory:

### `.env` (Default configuration)
```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_ENVIRONMENT=development
VITE_BYPASS_AUTH=false
```

### `.env.development` (Development mode)
```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_ENVIRONMENT=development
VITE_BYPASS_AUTH=true
```

### `.env.staging` (Staging environment)
```bash
VITE_API_BASE_URL=https://staging-api.yourapp.com
VITE_ENVIRONMENT=staging
VITE_BYPASS_AUTH=false
```

### `.env.production` (Production environment)
```bash
VITE_API_BASE_URL=https://api.yourapp.com
VITE_ENVIRONMENT=production
VITE_BYPASS_AUTH=false
```

## Usage

### Development Mode (Auth Bypass)
When `VITE_BYPASS_AUTH=true`, the application will:
- Skip all authentication checks
- Allow access to all routes without login
- Show the DockBar navigation immediately
- Display console logs about bypass status

### Production Mode
When `VITE_BYPASS_AUTH=false`, the application will:
- Enforce authentication on all routes
- Redirect unauthenticated users to `/login`
- Only show DockBar after successful authentication

## Scripts

Run the application in different modes:

```bash
# Development mode (uses .env.development)
npm run dev

# Build for staging
npm run build -- --mode staging

# Build for production
npm run build -- --mode production
```

## Environment Access in Code

```typescript
import { env, shouldBypassAuth, isDevelopment } from '@/config/env';

// Access environment variables
console.log(env.API_BASE_URL);
console.log(env.ENVIRONMENT);

// Check environment conditions
if (shouldBypassAuth()) {
  // Skip authentication
}

if (isDevelopment) {
  // Development-only code
}
```

## Security Notes

- Never commit `.env.local` files containing sensitive data
- Production API URLs should use HTTPS
- Auth bypass should NEVER be enabled in production
- Environment files are included in the repository for team consistency
