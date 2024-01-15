import { ReactElement } from 'react';
import {
  act,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  render as tlRender,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  renderHook as tlRenderHook,
  RenderHookOptions as TlRenderHookOptions,
  RenderOptions as TlRenderOptions,
} from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { userEvent } from '@testing-library/user-event';

export type UserEventOptions = Parameters<typeof userEvent.setup>[0];

interface RenderOptions {
  renderOptions?: TlRenderOptions;
  userEventOptions?: UserEventOptions;
}

interface RenderHookOptions<Props> {
  renderOptions?: TlRenderHookOptions<Props>;
  userEventOptions?: UserEventOptions;
}

type RenderStoryOptions = RenderOptions;

/**
 * Renders elements and sets up userEvent
 */
export function render(ui: ReactElement, options: RenderOptions = {}) {
  return {
    ...tlRender(ui, options.renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/**
 * Renders a hook
 */
export function renderHook<Props, Result>(
  callback: (props: Props) => Result,
  options: RenderHookOptions<Props> = {},
) {
  return {
    ...tlRenderHook(callback, options.renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/**
 * Renders a story
 */
export function renderStory(ui: ReactElement, options: RenderStoryOptions = {}) {
  return render(ui, options);
}

/**
 * Waits for any kind of async calculations to complete.
 *
 * Useful for example when testing components that automatically re-render (like: overlays)
 */
export function waitForAsyncActions() {
  return act(async () => {});
}
