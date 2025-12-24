/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/consistent-type-definitions -- interface required by vite */
interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCKING?: 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/* eslint-enable */
