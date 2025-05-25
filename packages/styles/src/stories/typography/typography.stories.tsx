import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Typography',
  tags: ['!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    // TODO: theme should be done globally
    <div data-theme="smeargle">
      <h1 className="natu-heading-1">Heading 1</h1>
      <h2 className="natu-heading-2">Heading 2</h2>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    // TODO: theme should be done globally
    <div data-theme="smeargle">
      <p className="natu-body-1">Body 1</p>
      <p className="natu-body-2">Body 2</p>
    </div>
  ),
};

export const Fluid: Story = {
  render: () => (
    // TODO: theme should be done globally
    <div data-theme="smeargle">
      <h1 className="natu-fluid-heading-1">Fluid Heading 1</h1>
      <h2 className="natu-fluid-heading-2">Fluid Heading 2</h2>
    </div>
  ),
};
