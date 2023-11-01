import type { Meta, StoryObj } from '@storybook/angular';
import { NatuCounterComponent } from './counter.component';

const meta = {
  title: 'Components/Counter',
  component: NatuCounterComponent,
  tags: ['autodocs'],
} satisfies Meta<NatuCounterComponent>;

export default meta;
type Story = StoryObj<NatuCounterComponent>;

export const Default: Story = {};
