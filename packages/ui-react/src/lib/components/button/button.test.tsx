import { axe } from '../../test';
import { renderStory } from '../../../test/render';
import { composeStories } from '@storybook/react';
import * as stories from './button.stories';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);

  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);

  expect(await axe(baseElement)).toHaveNoViolations();
});
