import { faker } from '@faker-js/faker';
import '@natu/axe/vitest/extend-expect';
import { beforeAll, beforeEach } from 'vitest';

beforeAll(() => {
  faker.seed(42);
});

beforeEach(() => {
  faker.seed(42);
});
