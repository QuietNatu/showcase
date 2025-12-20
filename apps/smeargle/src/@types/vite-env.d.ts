/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCKING?: 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
