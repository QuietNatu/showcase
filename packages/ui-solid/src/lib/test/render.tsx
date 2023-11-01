import { JSX } from 'solid-js';
import {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  render as tlRender,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  renderHook as tlRenderHook,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  renderDirective as tlRenderDirective,
} from '@solidjs/testing-library';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { userEvent } from '@testing-library/user-event';

export type UserEventOptions = Parameters<typeof userEvent.setup>[0];

type TlRenderOptions = NonNullable<Parameters<typeof tlRender>[1]>;
type TlRenderHookOptions<T extends unknown[]> = NonNullable<
  Parameters<typeof tlRenderHook<T, unknown>>[1]
>;
type TlRenderDirectiveOptions<Value, Target extends HTMLElement> = NonNullable<
  Parameters<typeof tlRenderDirective<unknown, Value, Target>>[1]
>;

interface RenderOptions {
  renderOptions?: TlRenderOptions;
  userEventOptions?: UserEventOptions;
}

interface RenderHookOptions<Props> {
  renderOptions?: TlRenderHookOptions<[Props]>;
  userEventOptions?: UserEventOptions;
}

interface RenderDirectiveOptions<Value, Target extends HTMLElement> {
  renderOptions?: TlRenderDirectiveOptions<Value, Target>;
  userEventOptions?: UserEventOptions;
}

type RenderStoryOptions = RenderOptions;

/**
 * Renders elements and sets up userEvent
 */
export function render(ui: () => JSX.Element, options: RenderOptions = {}) {
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
 * Renders directive and sets up userEvent
 */
export function renderDirective<Value, Target extends HTMLElement>(
  ui: () => JSX.Element,
  options: RenderDirectiveOptions<Value, Target> = {},
) {
  return {
    ...tlRenderDirective(ui, options.renderOptions),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/**
 * Renders a story
 */
export function renderStory(ui: () => JSX.Element, options: RenderStoryOptions = {}) {
  return render(ui, options);
}
