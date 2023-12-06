import { Decorator } from '@storybook/react';
import { useEffect } from 'react';

export function themeDecorator(): Decorator {
  return (Story, { globals }) => {
    const theme = globals['theme'];
    const colorScheme = globals['colorScheme'];

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-color-scheme', colorScheme);
    }, [theme, colorScheme]);

    return <Story />;
  };
}
