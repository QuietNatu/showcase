import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Color',
  tags: ['!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandPalette: Story = {
  render: () => <Palette colors={createShades('brand')} />,
};

export const GreyPalette: Story = {
  render: () => <Palette colors={createShades('grey')} />,
};

export const ErrorPalette: Story = {
  render: () => <Palette colors={createShades('error')} />,
};

export const WarningPalette: Story = {
  render: () => <Palette colors={createShades('warning')} />,
};

export const InfoPalette: Story = {
  render: () => <Palette colors={createShades('info')} />,
};

export const Text: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div
        style={{
          border: '1px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          height: '60px',
          background: `var(--natu-color-background-primary)`,
          color: 'var(--natu-color-text-primary)',
        }}
      >
        Primary text with primary background
      </div>
      <div
        style={{
          border: '1px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          height: '60px',
          background: `var(--natu-color-brand-50)`,
          color: 'var(--natu-color-text-on-color)',
        }}
      >
        On color text with brand background
      </div>
    </div>
  ),
};

function Palette({ colors }: Readonly<{ colors: { color: string; label: string }[] }>) {
  return (
    <ul style={{ display: 'flex' }}>
      {colors.map(({ color, label }) => (
        <li key={color}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {label}
          </div>

          <div
            style={{
              padding: '10px',
              width: '60px',
              height: '60px',
              background: `var(--natu-color-${color})`,
            }}
          ></div>
        </li>
      ))}
    </ul>
  );
}

function createShades(color: string) {
  return [
    { color: `white`, label: 'white' },
    { color: `${color}-05`, label: '05' },
    { color: `${color}-10`, label: '10' },
    { color: `${color}-20`, label: '20' },
    { color: `${color}-30`, label: '30' },
    { color: `${color}-40`, label: '40' },
    { color: `${color}-50`, label: '50' },
    { color: `${color}-60`, label: '60' },
    { color: `${color}-70`, label: '70' },
    { color: `${color}-80`, label: '80' },
    { color: `${color}-90`, label: '90' },
    { color: `${color}-95`, label: '95' },
    { color: `black`, label: 'black' },
  ];
}
