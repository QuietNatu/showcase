import { composeStories } from '@storybook/react';
import * as stories from './popover.stories';
import { axe, waitForAsyncActions } from '../../test';
import { render, renderStory } from '../../../test/render';
import { NatuPopover, NatuPopoverContent, NatuPopoverProps, NatuPopoverTrigger } from './popover';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

const { Playground, ...tooltipStories } = composeStories(stories);
const storyTestCases = Object.entries(tooltipStories);

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

test('does not show popover by default', async () => {
  const onOpenChangeSpy = vi.fn();
  await setup({ onOpenChange: onOpenChangeSpy });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

test('shows popover when trigger is clicked', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  expect(await screen.findByRole('dialog', { name: 'Example content' })).toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(1);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(true);
});

test('hides popover when pressing Escape', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  const popover = await screen.findByRole('dialog', { name: 'Example content' });

  expect(popover).toBeInTheDocument();

  await userEvent.keyboard('[Escape]');

  await waitForElementToBeRemoved(popover);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides popover when clicked outside', async () => {
  const { container, userEvent, onOpenChangeSpy } = await setup();

  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  const popover = await screen.findByRole('dialog', { name: 'Example content' });

  expect(popover).toBeInTheDocument();

  await userEvent.click(container);

  await waitForElementToBeRemoved(popover);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls popover default visibility', async () => {
  const { userEvent, onOpenChangeSpy } = await setup({ defaultIsOpen: true });

  const popover = await screen.findByRole('dialog', { name: 'Example content' });

  expect(popover).toBeInTheDocument();

  await userEvent.keyboard('[Escape]');

  await waitForElementToBeRemoved(popover);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(1);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls popover visibility', async () => {
  const { rerender, onOpenChangeSpy } = await setup({ isOpen: true });

  const popover = await screen.findByRole('dialog', { name: 'Example content' });

  expect(popover).toBeInTheDocument();

  rerender(
    <NatuPopover onOpenChange={onOpenChangeSpy} isOpen={false}>
      <NatuPopoverTrigger>
        <button type="button">Trigger</button>
      </NatuPopoverTrigger>

      <NatuPopoverContent aria-labelledby="popover-content-id">
        <div id="popover-content-id">Example content</div>
      </NatuPopoverContent>
    </NatuPopover>,
  );

  await waitForElementToBeRemoved(popover);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

test('does not show popover if disabled', async () => {
  const { userEvent, onOpenChangeSpy } = await setup({ isOpen: true, isDisabled: true });

  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

async function setup(props: Partial<NatuPopoverProps> = {}) {
  const onOpenChangeSpy = vi.fn();

  const view = render(
    <NatuPopover {...props} onOpenChange={onOpenChangeSpy}>
      <NatuPopoverTrigger>
        <button type="button">Trigger</button>
      </NatuPopoverTrigger>

      <NatuPopoverContent aria-labelledby="popover-content-id">
        <div id="popover-content-id">Example content</div>
      </NatuPopoverContent>
    </NatuPopover>,
  );

  await waitForAsyncActions();

  return { ...view, onOpenChangeSpy };
}
