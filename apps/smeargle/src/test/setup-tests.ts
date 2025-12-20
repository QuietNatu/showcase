import { afterAll, afterEach, beforeAll } from 'vitest';
import '@natu/axe/vitest/extend-expect';

import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from '../../.storybook/preview';
import { mockWorker } from '../mocks/api/browser';

const project = setProjectAnnotations([projectAnnotations]);

// TODO: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon

beforeAll(async () => {
  project.beforeAll();

  await mockWorker.start({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  mockWorker.resetHandlers();
});

afterAll(() => {
  mockWorker.stop();
});
