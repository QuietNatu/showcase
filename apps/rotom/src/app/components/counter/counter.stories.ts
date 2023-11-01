import type { Meta, StoryObj } from '@storybook/angular';
import { CounterComponent } from './counter.component';

const meta = {
  title: 'Components/Counter',
  component: CounterComponent,
  tags: ['autodocs'],
} satisfies Meta<CounterComponent>;

export default meta;
type Story = StoryObj<CounterComponent>;

export const Default: Story = {};
