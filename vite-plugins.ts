/*
  This file is needed to share plugins between vite and storybook
  TODO: when storybook 7 is released check if this file is still needed
 */
import type { PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export const vitePlugins: PluginOption[] = [tsconfigPaths(), svgr({ svgrOptions: { ref: true } })];
