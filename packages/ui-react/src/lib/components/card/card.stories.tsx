import type { Meta, StoryObj } from '@storybook/react';
import {
  NatuCard,
  NatuCardBody,
  NatuCardFooter,
  NatuCardFooterProps,
  NatuCardHeader,
  NatuCardHeaderProps,
  NatuCardProps,
} from './card';
import RocketIcon from '@natu/assets/svg/rocket.svg?react';
import { NatuIcon } from '../icon/icon';

interface StoryProps extends NatuCardProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
  headerArgs?: Partial<NatuCardHeaderProps>;
  footerArgs?: Partial<NatuCardFooterProps>;
}

const meta = {
  title: 'Components/Card',
  component: NatuCard,
  render: (args) => {
    const { headerArgs, footerArgs, hideHeader, hideFooter, ...cardArgs } = args;

    return (
      <NatuCard {...cardArgs} style={{ height: '400px' }}>
        {!hideHeader && (
          <NatuCardHeader
            {...headerArgs}
            icon={
              <NatuIcon>
                <RocketIcon />
              </NatuIcon>
            }
          >
            Example header
          </NatuCardHeader>
        )}

        <NatuCardBody>Example body</NatuCardBody>

        {!hideFooter && <NatuCardFooter {...footerArgs}>Example footer</NatuCardFooter>}
      </NatuCard>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {};

export const Dismissable: Story = {
  args: { isDismissable: true },
};

export const Embedded: Story = {
  args: { isEmbedded: true },
};

export const Small: Story = {
  args: {
    isDismissable: true,
    headerArgs: { size: 'small' },
    footerArgs: { size: 'small' },
  },
};

export const WithFooterDivider: Story = {
  args: {
    footerArgs: { hasDivider: true },
  },
};

export const NoHeaderOrFooter: Story = {
  args: {
    hideHeader: true,
    hideFooter: true,
  },
};
