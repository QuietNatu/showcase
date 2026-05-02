/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/consistent-type-definitions -- interface required by vite */
interface ImportMetaEnv {
  // Client-side environment variables

  readonly VITE_ENABLE_MOCKING?: 'true';
}

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/* eslint-enable */
