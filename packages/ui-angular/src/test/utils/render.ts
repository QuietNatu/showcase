import { Type } from '@angular/core';
import {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  render as tlRender,
  RenderComponentOptions,
  RenderResult,
  RenderTemplateOptions,
} from '@testing-library/angular';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import userEvent from '@testing-library/user-event';

export type UserEventOptions = Parameters<typeof userEvent.setup>[0];
export type UserEventResult = ReturnType<typeof userEvent.setup>;

interface RenderOptions<BaseOptions> {
  renderOptions?: BaseOptions;
  userEventOptions?: UserEventOptions;
}

interface ExtraRenderResult {
  userEvent: UserEventResult;
}

/**
 * Renders a elements and sets up userEvent
 */
export async function render<ComponentType>(
  component: Type<ComponentType>,
  options?: RenderOptions<RenderComponentOptions<ComponentType>>,
): Promise<RenderResult<ComponentType, ComponentType> & ExtraRenderResult>;
export async function render<WrapperType>(
  template: string,
  options?: RenderOptions<RenderTemplateOptions<WrapperType>>,
): Promise<RenderResult<WrapperType> & ExtraRenderResult>;
export async function render<ComponentType>(
  component: Type<ComponentType> | string,
  options:
    | RenderOptions<RenderComponentOptions<ComponentType>>
    | RenderOptions<RenderTemplateOptions<ComponentType>> = {},
) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    ...(await tlRender(component as any, options.renderOptions)),
    userEvent: userEvent.setup(options.userEventOptions),
  };
}

/* TODO: jasmine axe */
