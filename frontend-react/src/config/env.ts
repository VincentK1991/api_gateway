// Environment configuration utilities
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  BYPASS_AUTH: import.meta.env.VITE_BYPASS_AUTH === 'true',
} as const;

export const isDevelopment = env.ENVIRONMENT === 'development';
export const isStaging = env.ENVIRONMENT === 'staging';
export const isProduction = env.ENVIRONMENT === 'production';

// Helper functions
export const shouldBypassAuth = (): boolean => {
  return env.BYPASS_AUTH;
};

export const getApiBaseUrl = (): string => {
  return env.API_BASE_URL;
};

// Log environment info (only in development)
if (isDevelopment) {
  console.log('🌍 Environment Configuration:', {
    API_BASE_URL: env.API_BASE_URL,
    ENVIRONMENT: env.ENVIRONMENT,
    BYPASS_AUTH: env.BYPASS_AUTH,
  });
}
