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
        label: 'Patients',
        icon: (
          <NatuIcon>
            <DnaIcon />
          </NatuIcon>
        ),
        items: [
          {
            label: 'General Info',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
          {
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
        label: 'Staff',
        icon: (
          <NatuIcon>
            <DnaIcon />
          </NatuIcon>
        ),
        items: [
          {
            label: 'General Info',
            render: (props) => (
              <a {...props} href="/">
                {props.children}
              </a>
            ),
          },
          {
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
  render: (args) => <NatuSidebar {...args}>Example header</NatuSidebar>,
} satisfies Meta<typeof NatuSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
