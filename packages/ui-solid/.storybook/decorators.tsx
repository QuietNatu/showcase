import { Decorator } from 'storybook-solidjs';

export function themeDecorator(): Decorator {
  return (Story, { globals }) => {
    document.documentElement.setAttribute('data-theme', globals['theme']);
    document.documentElement.setAttribute('data-color-scheme', globals['colorScheme']);

    return <Story />;
  };
}
