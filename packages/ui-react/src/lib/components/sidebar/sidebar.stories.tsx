import type { Meta, StoryObj } from '@storybook/react';
import { NatuSidebar, NatuSidebarAction } from './sidebar';
import DnaIcon from '@natu/assets/svg/dna.svg?react';
import RocketIcon from '@natu/assets/svg/rocket.svg?react';
import MaskHappyIcon from '@natu/assets/svg/mask-happy.svg?react';
import { NatuIcon } from '../icon/icon';

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebar,
  tags: ['autodocs'],
  args: {},
  render: (args) => {
    const actions: NatuSidebarAction[] = [
      {
        label: 'Patients',
        icon: (
          <NatuIcon>
            <DnaIcon />
          </NatuIcon>
        ),
        items: [
          {
            label: 'General Info',
            itemWrapper: (children) => <a href="/">{children}</a>,
          },
          {
            label: 'Records',
            itemWrapper: (children) => <a href="/">{children}</a>,
          },
        ],
      },
      {
        label: 'Culture',
        icon: (
          <NatuIcon>
            <MaskHappyIcon />
          </NatuIcon>
        ),
        itemWrapper: (children) => <a href="/">{children}</a>,
      },
      {
        label: 'Activities',
        icon: (
          <NatuIcon>
            <RocketIcon />
          </NatuIcon>
        ),
        itemWrapper: (children) => <button type="button">{children}</button>,
      },
    ];

    const secondaryActions: NatuSidebarAction[] = [];

    return (
      <NatuSidebar {...args} actions={actions} secondaryActions={secondaryActions}>
        Example header
      </NatuSidebar>
    );
  },
} satisfies Meta<typeof NatuSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
