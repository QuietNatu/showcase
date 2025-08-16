import '@natu/axe/vitest/extend-expect';

import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from '../../.storybook/preview';

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
