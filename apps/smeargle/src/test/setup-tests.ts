import { afterAll, afterEach, beforeAll } from 'vitest';
import '@natu/axe/vitest/extend-expect';

import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from '../../.storybook/preview';
import { mockWorker } from '../mocks/api/browser';

const project = setProjectAnnotations([projectAnnotations]);

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
