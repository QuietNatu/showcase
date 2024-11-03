import type { Meta, StoryObj } from '@storybook/angular';
import { NatuTableComponent } from './table.component';

const meta = {
  title: 'Components/Table',
  component: NatuTableComponent,
} satisfies Meta<NatuTableComponent>;

export default meta;
type Story = StoryObj<NatuTableComponent>;

export const Default: Story = {};
