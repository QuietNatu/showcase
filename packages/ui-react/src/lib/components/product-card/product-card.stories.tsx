import type { Meta, StoryObj } from '@storybook/react-vite';

import productImageUrl from '../../../mocks/assets/product-image.jpg';
import { NatuProductCard } from '.';

const meta = {
  title: 'Components/Product Card',
  component: NatuProductCard.Root,
  subcomponents: {
    Media: NatuProductCard.Media,
    Image: NatuProductCard.Image,
    Body: NatuProductCard.Body,
    Link: NatuProductCard.Link,
    Heading: NatuProductCard.Heading,
    Interactable: NatuProductCard.Interactable,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NatuProductCard.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <NatuProductCard.Root {...args}>
      <NatuProductCard.Link href="." />

      <NatuProductCard.Media>
        <NatuProductCard.Image
          src={productImageUrl}
          style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
        />
      </NatuProductCard.Media>

      <NatuProductCard.Body>
        <NatuProductCard.Heading>Heading</NatuProductCard.Heading>

        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ex quis
          egestas maximus. In hac habitasse platea dictumst. Etiam pretium rhoncus nibh, quis
          scelerisque massa commodo eu.
        </p>
      </NatuProductCard.Body>
    </NatuProductCard.Root>
  ),
};

export const WithButtons: Story = {
  render: (args) => (
    <NatuProductCard.Root {...args}>
      <NatuProductCard.Link href="." />

      <NatuProductCard.Media>
        <NatuProductCard.Image
          src={productImageUrl}
          style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
        />
      </NatuProductCard.Media>

      <NatuProductCard.Body style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NatuProductCard.Heading>Heading</NatuProductCard.Heading>

        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ex quis
          egestas maximus. In hac habitasse platea dictumst. Etiam pretium rhoncus nibh, quis
          scelerisque massa commodo eu.
        </p>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <NatuProductCard.Interactable
            render={
              <button type="button" style={{ flex: '1' }}>
                Buy
              </button>
            }
          />

          <NatuProductCard.Interactable
            render={
              <button type="button" style={{ flex: '1' }}>
                Share
              </button>
            }
          />
        </div>
      </NatuProductCard.Body>
    </NatuProductCard.Root>
  ),
};
