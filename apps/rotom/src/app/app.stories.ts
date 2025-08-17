import type { Meta, StoryObj } from '@analogjs/storybook-angular';
import { App } from './app';

const meta = {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
