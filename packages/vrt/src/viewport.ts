import { VrtViewport } from './types';

export const defaultViewports = {
  phone: {
    name: 'phone',
    width: 390,
    height: 844,
  },
  laptop: {
    name: 'laptop',
    width: 1366,
    height: 768,
  },
  desktop: {
    name: 'desktop',
    width: 1920,
    height: 1000,
  },
} satisfies Record<string, VrtViewport>;
