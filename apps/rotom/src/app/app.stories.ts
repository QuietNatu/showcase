import { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

const meta = {
  title: 'App',
  component: AppComponent,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<AppComponent>;

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
