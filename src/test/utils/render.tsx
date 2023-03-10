import { ReactElement } from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  render as tlRender,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  renderHook as tlRenderHook,
  RenderHookOptions as TlRenderHookOptions,
  RenderOptions as TlRenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export type UserEventOptions = Parameters<typeof userEvent.setup>[0];

interface RenderOptions {
  renderOptions?: TlRenderOptions;
  userEventOptions?: UserEventOptions;
}

interface RenderHookOptions<Props> {
  renderOptions?: TlRenderHookOptions<Props>;
  userEventOptions?: UserEventOptions;
}

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
  options: RenderHookOptions<Props> = {}
) {
  return {
    ...tlRenderHook(callback, options.renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}
