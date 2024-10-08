import type { Meta, StoryObj } from '@storybook/react';
import {
  NatuButton,
  NatuButtonSlottedProps,
  NatuButtonUnslottedProps,
  NatuButtonVariants,
} from './button';
import { storyVariantsDecorator } from '../../stories';
import RocketIcon from '@natu/assets/svg/rocket.svg?react';
import { NatuIcon } from '../icon/icon';

const variants: NatuButtonVariants['variant'][] = [
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
  component: NatuButton,
  decorators: [storyVariantsDecorator()],
  args: {
    children: 'Button',
  },
  render: (args) => (
    <>
      {variants.map((variant) => (
        <NatuButton {...args} key={variant} variant={variant} asChild={false} type="button">
          {args.children}
        </NatuButton>
      ))}
    </>
  ),
} satisfies Meta<typeof NatuButton>;

export default meta;
type UnslottedStory = StoryObj<NatuButtonUnslottedProps>;
type SlottedStory = StoryObj<NatuButtonSlottedProps>;

export const Default: UnslottedStory = {};

export const Small: UnslottedStory = {
  args: {
    size: 'small',
  },
};

export const Disabled: UnslottedStory = {
  args: {
    isDisabled: true,
  },
};

export const CustomElement: SlottedStory = {
  render: (args) => (
    <>
      {variants.map((variant) => (
        <NatuButton {...args} key={variant} variant={variant} asChild={true}>
          <span>Button</span>
        </NatuButton>
      ))}
    </>
  ),
};

export const CustomElementDisabled: SlottedStory = {
  render: CustomElement.render,
  args: {
    isDisabled: true,
  },
};

export const IconButton: UnslottedStory = {
  args: {
    isIconButton: true,
    children: (
      <>
        <span className="natu-visually-hidden">Icon</span>
        <NatuIcon aria-hidden="true">
          <RocketIcon />
        </NatuIcon>
      </>
    ),
  },
};

export const IconButtonSmall: UnslottedStory = {
  args: {
    ...IconButton.args,
    size: 'small',
  },
};
