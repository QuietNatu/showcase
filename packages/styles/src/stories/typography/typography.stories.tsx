import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Typography',
  tags: ['!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <>
      <h1 className="natu-heading-1">Heading 1</h1>
      <h2 className="natu-heading-2">Heading 2</h2>
    </>
  ),
};

export const Body: Story = {
  render: () => (
    <>
      <p className="natu-body-1">Body 1</p>
      <p className="natu-body-2">Body 2</p>
    </>
  ),
};

export const Fluid: Story = {
  render: () => (
    <>
      <h1 className="natu-fluid-heading-1">Fluid Heading 1</h1>
      <h2 className="natu-fluid-heading-2">Fluid Heading 2</h2>
    </>
  ),
};

export const Weights: Story = {
  render: () => (
    <>
      <p
        className="natu-heading-1"
        style={{ fontWeight: 'var(--natu-font-weight-light)', margin: 'var(--natu-spacing-4) 0' }}
      >
        Light
      </p>
      <p
        className="natu-heading-1"
        style={{ fontWeight: 'var(--natu-font-weight-regular)', margin: 'var(--natu-spacing-4) 0' }}
      >
        Regular
      </p>
      <p
        className="natu-heading-1"
        style={{ fontWeight: 'var(--natu-font-weight-strong)', margin: 'var(--natu-spacing-4) 0' }}
      >
        Strong
      </p>
    </>
  ),
};
