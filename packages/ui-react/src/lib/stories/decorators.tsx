import { Decorator } from '@storybook/react';
import { useEffect } from 'react';

export function storyThemeDecorator(): Decorator {
  // eslint-disable-next-line react/display-name
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
