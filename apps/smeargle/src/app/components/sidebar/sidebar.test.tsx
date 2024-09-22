import { composeStories } from '@storybook/react';
import * as stories from './sidebar.stories';
import { axe } from '@natu/ui-react/test';
import { renderStory } from '@/test/render';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);

  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);

  expect(await axe(baseElement)).toHaveNoViolations();
});
