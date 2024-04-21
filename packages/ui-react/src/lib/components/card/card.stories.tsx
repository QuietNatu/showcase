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

interface StoryProps extends NatuCardProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
  headerArgs?: Partial<NatuCardHeaderProps>;
  footerArgs?: Partial<NatuCardFooterProps>;
}

const meta = {
  title: 'Components/Card',
  component: NatuCard,
  tags: ['autodocs'],
  render: (args) => {
    const { headerArgs, footerArgs, hideHeader, hideFooter, ...cardArgs } = args;

    return (
      <NatuCard {...cardArgs}>
        {!hideHeader && (
          <NatuCardHeader {...headerArgs} icon={<RocketIcon className="natu-svg-icon" />}>
            Example header
          </NatuCardHeader>
        )}

        <NatuCardBody>Example actions</NatuCardBody>

        {!hideFooter && <NatuCardFooter {...footerArgs}>Example secondary actions</NatuCardFooter>}
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
