import { Decorator } from '@storybook/react';
import { useEffect } from 'react';

export function storyThemeDecorator(): Decorator {
  return (Story, { globals }) => {
    const theme = globals['theme'] as string;
    const colorScheme = globals['colorScheme'] as string;

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-color-scheme', colorScheme);
    }, [theme, colorScheme]);

    return <Story />;
  };
}

export function storyVariantsDecorator(): Decorator {
  return (Story) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Story />
    </div>
  );
}
