/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_E2E?: 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
