/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
  readonly VITE_E2E?: 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
