/*
  This file is needed to share plugins between vite and storybook
  TODO: when storybook 7 is released check if this file is still needed
 */
import type { PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const vitePlugins: PluginOption[] = [tsconfigPaths()];
