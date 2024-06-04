import { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta = {
  title: 'Components/Sidebar',
  component: SidebarComponent,
} satisfies Meta<SidebarComponent>;

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Default: Story = {};
