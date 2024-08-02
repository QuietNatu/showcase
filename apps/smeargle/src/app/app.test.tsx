import { composeStories } from '@storybook/react';
import * as stories from './app.stories';
import { axe } from '@natu/ui-react/test';
import { screen } from '@testing-library/react';
import { render, renderStory } from '@/test/render';
import { App } from './app';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);
  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

// TODO: remove
test('temp', async () => {
  render(<App />);
  expect(await screen.findByText('Hello EN GB')).toBeInTheDocument();
});
