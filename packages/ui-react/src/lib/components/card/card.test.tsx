import { composeStories } from '@storybook/react';
import * as stories from './card.stories';
import { axe, render, renderStory } from '../../test';
import { NatuCard, NatuCardBody, NatuCardFooter, NatuCardHeader } from './card';
import { screen } from '@testing-library/react';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);
  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

test('trigger onDimiss callback when clicked', async () => {
  const onDismissSpy = vi.fn();
  const { userEvent } = render(
    <NatuCard isDismissable={true} onDismiss={onDismissSpy}>
      <NatuCardHeader>Example header</NatuCardHeader>

      <NatuCardBody>Example actions</NatuCardBody>

      <NatuCardFooter>Example secondary actions</NatuCardFooter>
    </NatuCard>,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

  expect(onDismissSpy).toHaveBeenCalledTimes(1);
});
