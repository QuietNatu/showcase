// Setup tests here

import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from '../../.storybook/preview';

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
