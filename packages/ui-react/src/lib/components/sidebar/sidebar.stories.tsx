import type { Meta, StoryObj } from '@storybook/react';
import { NatuSidebar } from './sidebar';
import DnaIcon from '@natu/assets/svg/dna.svg?react';
import RocketIcon from '@natu/assets/svg/rocket.svg?react';
import MaskHappyIcon from '@natu/assets/svg/mask-happy.svg?react';
import { NatuIcon } from '../icon/icon';

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    actions: [
      {
        id: 'patients',
        label: 'Patients',
        icon: (
          <NatuIcon>
            <DnaIcon />
          </NatuIcon>
        ),
        items: [
          {
            id: 'patients/general-info',
            label: 'General Info',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
          {
            id: 'patients/records',
            label: 'Records',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
        ],
      },
      {
        id: 'culture',
        label: 'Culture',
        icon: (
          <NatuIcon>
            <MaskHappyIcon />
          </NatuIcon>
        ),
        render: (props) => (
          <a {...props} href="/">
            {props.children}
          </a>
        ),
      },
      {
        id: 'activities',
        label: 'Activities',
        icon: (
          <NatuIcon>
            <RocketIcon />
          </NatuIcon>
        ),
        render: (props) => (
          <button {...props} type="button">
            {props.children}
          </button>
        ),
      },
    ],

    secondaryActions: [
      {
        id: 'staff',
        label: 'Staff',
        icon: (
          <NatuIcon>
            <DnaIcon />
          </NatuIcon>
        ),
        items: [
          {
            id: 'staff/general-info',
            label: 'General Info',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
          {
            id: 'staff/records',
            label: 'Records',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
        ],
      },
      {
        id: 'culture2',
        label: 'Culture',
        icon: (
          <NatuIcon>
            <MaskHappyIcon />
          </NatuIcon>
        ),
        render: (props) => (
          <a {...props} href="/">
            {props.children}
          </a>
        ),
      },
      {
        id: 'activities2',
        label: 'Activities',
        icon: (
          <NatuIcon>
            <RocketIcon />
          </NatuIcon>
        ),
        render: (props) => (
          <button {...props} type="button">
            {props.children}
          </button>
        ),
      },
    ],
  },
  render: (args) => (
    <NatuSidebar {...args}>
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 0.5rem',
        }}
      >
        Example header
      </div>
    </NatuSidebar>
  ),
} satisfies Meta<typeof NatuSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    // TODO: default is expanded
  },
};

export const Active: Story = {
  args: {
    activeAction: 'culture',
  },
};
