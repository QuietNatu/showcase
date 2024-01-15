import { composeStories } from '@storybook/react';
import { axe, render, renderStory, waitForAsyncActions } from '../../test';
import * as stories from './tooltip.stories';
import { NatuButton } from '../button/button';
import { ReactNode } from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { NatuTooltip, NatuTooltipProps } from './tooltip';
import { NatuUiConfigProvider } from '../../providers';

const { Playground, ...tooltipStories } = composeStories(stories);
const storyTestCases = Object.entries(tooltipStories);

const UiConfigProvider = ({ children }: { children: ReactNode }) => (
  <NatuUiConfigProvider value={{ tooltip: { hoverDelay: 0 } }}>{children}</NatuUiConfigProvider>
);

test.each(storyTestCases)('renders %s story', async (_, Story) => {
  const { container } = renderStory(<Story isOpen={true} />, {
    renderOptions: { wrapper: UiConfigProvider },
  });

  await waitForAsyncActions();

  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations when closed', async (_, Story) => {
  const { baseElement } = renderStory(<Story isOpen={false} />, {
    renderOptions: { wrapper: UiConfigProvider },
  });

  await waitForAsyncActions();

  expect(await axe(baseElement)).toHaveNoViolations();
});

test.each(storyTestCases)('%s has no accessibility violations when open', async (_, Story) => {
  const { baseElement } = renderStory(<Story isOpen={true} />, {
    renderOptions: { wrapper: UiConfigProvider },
  });

  await waitForAsyncActions();

  expect(await axe(baseElement)).toHaveNoViolations();
});

test('does not show tooltip by default', async () => {
  const { onOpenChangeSpy } = await setup();

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

test('shows tooltip when trigger is hovered', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

  expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledOnce();
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(true);
});

test('shows tooltip when trigger is focused', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  // Should not be a click but jsdom does not have the required API for focus-visible
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

  expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledOnce();
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(true);
});

test('hides tooltip when trigger is unhovered', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));
  await userEvent.unhover(screen.getByRole('button', { name: 'Trigger' }));

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides tooltip when trigger loses focus', async () => {
  const { container, userEvent, onOpenChangeSpy } = await setup();

  // Should not be a click but jsdom does not have the required API for focus-visible
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await userEvent.click(container);

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(4); // Click also triggers hover
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides tooltip when pressing Escape', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));
  await userEvent.keyboard('[Escape]');

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides tooltip when clicked outside', async () => {
  const { container, userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));
  await userEvent.click(container);

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls tooltip visibility', async () => {
  const { rerender, onOpenChangeSpy } = await setup({ isOpen: true });

  expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();

  rerender(
    <NatuTooltip content="Example tooltip" onOpenChange={onOpenChangeSpy} isOpen={false}>
      <NatuButton type="button">Trigger</NatuButton>
    </NatuTooltip>,
  );

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

test('does not show tooltip if disabled', async () => {
  const { userEvent } = await setup({ isOpen: true, isDisabled: true });

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

async function setup(props: Partial<NatuTooltipProps> = {}) {
  const onOpenChangeSpy = vi.fn();

  const view = render(
    <NatuTooltip content="Example tooltip" onOpenChange={onOpenChangeSpy} {...props}>
      <NatuButton type="button">Trigger</NatuButton>
    </NatuTooltip>,
    { renderOptions: { wrapper: UiConfigProvider } },
  );

  await waitForAsyncActions();

  return { ...view, onOpenChangeSpy };
}
