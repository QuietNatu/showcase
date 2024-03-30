import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  argsToTemplate,
  applicationConfig,
} from '@storybook/angular';
import { NatuButtonDirective, NatuButtonVariants, natuButtonImports } from './button.directive';
import { storyVariantsDecorator } from '../../stories';
import { SvgIconComponent, provideSvgIcons } from '@natu/assets';
import { rocketIcon } from '@natu/assets/svg/rocket';

const variants: Array<NatuButtonVariants['variant']> = [
  'primary',
  'destructive',
  'outline',
  'outline-destructive',
  'ghost',
  'ghost-destructive',
  'ghost-muted',
];

const meta = {
  title: 'Components/Button',
  component: NatuButtonDirective,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideSvgIcons([rocketIcon])] }),
    moduleMetadata({ imports: [natuButtonImports, SvgIconComponent] }),
    storyVariantsDecorator(),
  ],
  render: (args) => {
    const templateVariants = variants.map((variant) => {
      const buttonArgs = argsToTemplate(args, { exclude: ['variant'] });
      return `<button type="button" [natuButton] [variant]="'${variant}'" ${buttonArgs}>Button</button>`;
    });

    return {
      props: args,
      template: templateVariants.join(''),
    };
  },
} satisfies Meta<NatuButtonDirective>;

export default meta;
type Story = StoryObj<NatuButtonDirective>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const CustomElement: Story = {
  render: (args) => {
    const templateVariants = variants.map((variant) => {
      const buttonArgs = argsToTemplate(args, { exclude: ['variant'] });
      return `<span [natuButton] [variant]="'${variant}'" ${buttonArgs}>Button</span>`;
    });

    return {
      props: args,
      template: templateVariants.join(''),
    };
  },
};

export const CustomElementDisabled: Story = {
  render: CustomElement.render,
  args: {
    isDisabled: true,
  },
};

export const IconButton: Story = {
  render: (args) => {
    const templateVariants = variants.map((variant) => {
      const buttonArgs = argsToTemplate(args, { exclude: ['variant'] });
      return `
        <button type="button" [natuButton] [variant]="'${variant}'" ${buttonArgs}>
          <svg-icon [key]="'rocket'" />
        </button>
      `;
    });

    return {
      props: args,
      template: templateVariants.join(''),
    };
  },
  args: {
    isIconButton: true,
  },
};

export const IconButtonSmall: Story = {
  render: IconButton.render,
  args: {
    isIconButton: true,
    size: 'small',
  },
};
