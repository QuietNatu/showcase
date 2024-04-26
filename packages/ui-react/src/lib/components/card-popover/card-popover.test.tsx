import { composeStories } from '@storybook/react';
import * as stories from './card-popover.stories';
import { axe, render, renderStory, waitForAsyncActions } from '../../test';
import {
  NatuCardPopover,
  NatuCardPopoverContent,
  NatuCardPopoverContentBody,
  NatuCardPopoverContentHeader,
  NatuCardPopoverProps,
  NatuCardPopoverTrigger,
} from './card-popover';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', async (_, Story) => {
  const { container } = renderStory(<Story />);

  await waitForAsyncActions();

  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations when closed', async (_, Story) => {
  const { baseElement } = renderStory(<Story isOpen={false} />);

  await waitForAsyncActions();

  expect(await axe(baseElement)).toHaveNoViolations();
});

test.each(storyTestCases)('%s has no accessibility violations when open', async (_, Story) => {
  const { baseElement } = renderStory(<Story isOpen={true} />);

  await waitForAsyncActions();

  expect(await axe(baseElement)).toHaveNoViolations();
});

test('hides popover when card dismiss button is clicked', async () => {
  const { container, userEvent, onOpenChangeSpy } = await setup();

  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  const popover = await screen.findByRole('dialog', { name: 'Header' });

  expect(popover).toBeInTheDocument();

  await userEvent.click(container);

  await waitForElementToBeRemoved(popover);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

async function setup(props: Partial<NatuCardPopoverProps> = {}) {
  const onOpenChangeSpy = vi.fn();

  const view = render(
    <NatuCardPopover {...props} onOpenChange={onOpenChangeSpy}>
      <NatuCardPopoverTrigger>
        <button type="button">Trigger</button>
      </NatuCardPopoverTrigger>

      <NatuCardPopoverContent>
        <NatuCardPopoverContentHeader>Header</NatuCardPopoverContentHeader>
        <NatuCardPopoverContentBody>Example body</NatuCardPopoverContentBody>
      </NatuCardPopoverContent>
    </NatuCardPopover>,
  );

  await waitForAsyncActions();

  return { ...view, onOpenChangeSpy };
}
