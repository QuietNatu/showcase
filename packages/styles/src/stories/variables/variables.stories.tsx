import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Variables',
  tags: ['!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const breakpoints = [
  { name: 'initial', description: 'Phones (portrait)' },
  { name: 'xs', description: 'Phones (landscape)' },
  { name: 'sm', description: 'Tablets (portrait)' },
  { name: 'md', description: 'Tablets (landscape)' },
  { name: 'lg', description: 'Laptops' },
  { name: 'xl', description: 'Desktops' },
];

export const Breakpoints: Story = {
  render: () => {
    const style = getComputedStyle(document.documentElement);

    return (
      <table className="story-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Description</th>
            <th>Value</th>
            <th>CSS variable</th>
            <th>SCSS variable</th>
          </tr>
        </thead>

        <tbody>
          {breakpoints.map(({ name, description }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{description}</td>
              <td>{style.getPropertyValue(`--natu-breakpoint-${name}`)}</td>
              <td>--natu-breakpoint-{name}</td>
              <td>$breakpoint-{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
