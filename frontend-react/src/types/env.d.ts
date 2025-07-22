/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  readonly VITE_BYPASS_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
