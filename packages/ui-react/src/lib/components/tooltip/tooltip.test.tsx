import { composeStories } from '@storybook/react';
import { axe, render, renderStory, waitForAsyncActions } from '../../test';
import * as stories from './tooltip.stories';
import { ReactNode } from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { NatuTooltip, NatuTooltipContent, NatuTooltipProps, NatuTooltipTrigger } from './tooltip';
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

  const tooltip = await screen.findByRole('tooltip');

  await userEvent.unhover(screen.getByRole('button', { name: 'Trigger' }));

  await waitForElementToBeRemoved(tooltip);

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
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(3);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides tooltip when pressing Escape', async () => {
  const { userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

  const tooltip = await screen.findByRole('tooltip');

  await userEvent.keyboard('[Escape]');

  await waitForElementToBeRemoved(tooltip);

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('hides tooltip when clicked outside', async () => {
  const { container, userEvent, onOpenChangeSpy } = await setup();

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

  const tooltip = await screen.findByRole('tooltip');

  await userEvent.click(container);

  await waitForElementToBeRemoved(tooltip);

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledTimes(2);
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls tooltip default visibility', async () => {
  const { userEvent, onOpenChangeSpy } = await setup({ defaultIsOpen: true });

  const tooltip = await screen.findByRole('tooltip', { name: 'Example tooltip' });

  expect(tooltip).toBeInTheDocument();

  await userEvent.keyboard('[Escape]');

  await waitForElementToBeRemoved(tooltip);

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).toHaveBeenCalledOnce();
  expect(onOpenChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls tooltip visibility', async () => {
  const { rerender, onOpenChangeSpy } = await setup({ isOpen: true });

  expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();

  rerender(
    <NatuTooltip onOpenChange={onOpenChangeSpy} isOpen={false}>
      <NatuTooltipTrigger>
        <button type="button">Trigger</button>
      </NatuTooltipTrigger>

      <NatuTooltipContent>Example tooltip</NatuTooltipContent>
    </NatuTooltip>,
  );

  await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

test('does not show tooltip if disabled', async () => {
  const { userEvent, onOpenChangeSpy } = await setup({ isOpen: true, isDisabled: true });

  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(onOpenChangeSpy).not.toHaveBeenCalled();
});

async function setup(props: Partial<NatuTooltipProps> = {}) {
  const onOpenChangeSpy = vi.fn();

  const view = render(
    <NatuTooltip onOpenChange={onOpenChangeSpy} {...props}>
      <NatuTooltipTrigger>
        <button type="button">Trigger</button>
      </NatuTooltipTrigger>

      <NatuTooltipContent>Example tooltip</NatuTooltipContent>
    </NatuTooltip>,
    { renderOptions: { wrapper: UiConfigProvider } },
  );

  await waitForAsyncActions();

  return { ...view, onOpenChangeSpy };
}
