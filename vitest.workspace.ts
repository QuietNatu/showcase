import { defineWorkspace } from 'vitest/config';

// TODO: fix this once VSCODE vitest extension supports vitest v4
export default defineWorkspace(['apps/**/vite.config.ts', 'packages/**/vite.config.ts']);
