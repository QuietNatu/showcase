import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { NatuHeaderDirective } from './header.directive';

const meta = {
  title: 'Components/Header',
  component: NatuHeaderDirective,
  render: (args) => ({ template: `<header natuHeader ${argsToTemplate(args)}>Header</header>` }),
} satisfies Meta<NatuHeaderDirective>;

export default meta;
type Story = StoryObj<NatuHeaderDirective>;

export const Default: Story = {};
