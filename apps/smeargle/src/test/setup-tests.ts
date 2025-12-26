import '@natu/axe/vitest/extend-expect';

import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from '../../.storybook/preview';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { mockWorker } from '../mocks/api/browser';

// TODO: remove?
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
