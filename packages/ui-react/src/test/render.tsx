import { JSXElementConstructor, ReactNode } from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  render as tlRender,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  renderHook as tlRenderHook,
  RenderHookOptions as TlRenderHookOptions,
  RenderOptions as TlRenderOptions,
} from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { userEvent } from '@testing-library/user-event';
import { NatuUiConfigProvider } from '../lib/contexts';
import { createTestWrapper } from '../lib/test';

export type UserEventOptions = Parameters<typeof userEvent.setup>[0];

interface RenderOptions {
  renderOptions?: TlRenderOptions;
  userEventOptions?: UserEventOptions;
  providerOptions?: ProviderOptions;
}

interface RenderHookOptions<Props> {
  renderOptions?: TlRenderHookOptions<Props>;
  userEventOptions?: UserEventOptions;
  providerOptions?: ProviderOptions;
}

type RenderStoryOptions = RenderOptions;

interface ProviderOptions {
  excludeUiConfig?: boolean;
}

/**
 * Renders elements and sets up userEvent.
 */
export function render(ui: ReactNode, options: RenderOptions = {}) {
  const wrapper = wrapTest(options.providerOptions, options.renderOptions?.wrapper);
  const renderOptions = { ...options.renderOptions, wrapper };

  return {
    ...tlRender(ui, renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/**
 * Renders a hook.
 */
export function renderHook<Props, Result>(
  callback: (props: Props) => Result,
  options: RenderHookOptions<Props> = {},
) {
  const wrapper = wrapTest(options.providerOptions, options.renderOptions?.wrapper);
  const renderOptions = { ...options.renderOptions, wrapper };

  return {
    ...tlRenderHook(callback, renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/**
 * Renders a story.
 */
export function renderStory(ui: ReactNode, options: RenderStoryOptions = {}) {
  return render(ui, options);
}

function wrapTest(
  props: ProviderOptions = {},
  BaseWrapper?: JSXElementConstructor<{ children: ReactNode }>,
) {
  return createTestWrapper([!props.excludeUiConfig && UiConfigWrapper, BaseWrapper]);
}

const UiConfigWrapper = (props: { children: ReactNode }) => (
  <NatuUiConfigProvider {...props} value={{ tooltip: { hoverDelay: 0 } }} />
);
