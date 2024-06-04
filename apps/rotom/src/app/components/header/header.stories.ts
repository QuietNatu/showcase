import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta = {
  title: 'Components/Header',
  component: HeaderComponent,
} satisfies Meta<HeaderComponent>;

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {};
