import { Decorator } from '@storybook/react';
import React, { useEffect } from 'react';

export function themeDecorator(): Decorator {
  return (Story, { globals }) => {
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', globals.theme);
      document.documentElement.setAttribute('data-color-scheme', globals.colorScheme);
    }, [globals.theme, globals.colorScheme]);

    return <Story />;
  };
}
