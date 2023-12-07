import { Decorator } from 'storybook-solidjs';

export function storyThemeDecorator(): Decorator {
  return (Story, { globals }) => {
    document.documentElement.setAttribute('data-theme', globals['theme'] as string);
    document.documentElement.setAttribute('data-color-scheme', globals['colorScheme'] as string);

    return <Story />;
  };
}
