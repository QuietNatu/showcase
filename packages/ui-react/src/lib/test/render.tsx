import { JSXElementConstructor, ReactNode } from 'react';
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
import { NatuUiConfigProvider } from '../providers';

/* TODO: re export these utils in smeargle to add i18n and add eslint rule to forbid these exports in smeargle */

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
  const wrapper = wrapTestProviders(options.providerOptions, options.renderOptions?.wrapper);
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
  const wrapper = wrapTestProviders(options.providerOptions, options.renderOptions?.wrapper);
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

/**
 * Waits for any kind of async calculations to complete.
 *
 * Useful for example when testing components that automatically re-render (like: overlays)
 */
export function waitForAsyncActions() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  return act(async () => {});
}

function wrapTestProviders(
  props: ProviderOptions = {},
  Wrapper?: JSXElementConstructor<{ children: ReactNode }>,
) {
  const UiConfigWrapper = ({ children }: { children: ReactNode }) => (
    <NatuUiConfigProvider value={{ tooltip: { hoverDelay: 0 } }}>{children}</NatuUiConfigProvider>
  );

  return ({ children }: { children: ReactNode }) =>
    applyWrappers(Wrapper ? <Wrapper>{children}</Wrapper> : children, [
      !props.excludeUiConfig && UiConfigWrapper,
    ]);
}

function applyWrappers(
  children: ReactNode,
  wrappers: Array<false | ((props: { children: ReactNode }) => JSX.Element)>,
) {
  return wrappers
    .filter((wrapper): wrapper is (props: { children: ReactNode }) => JSX.Element =>
      Boolean(wrapper),
    )
    .reduceRight((children, wrapper) => wrapper({ children }), children);
}
