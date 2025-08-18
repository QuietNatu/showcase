import type { Meta, StoryObj } from '@analogjs/storybook-angular';
import { ExampleCounter } from './example-counter';

const meta = {
  title: 'Components/Example Counter',
  component: ExampleCounter,
} satisfies Meta<typeof ExampleCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
