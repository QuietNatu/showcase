import type { Page, TestInfo } from '@playwright/test';

export type VrtViewport = {
  name: string;
  width: number;
  height: number;
};

export type VrtVariantOption<T> = { id: string; data: T };
export type VrtVariant<T> = { options: VrtVariantOption<T>[] };

export type VrtScenario<TVariant> = {
  /** The precision threshold between the produced screenshot and the saved screenshot. */
  threshold?: number;
  /** Perform interactions after the page is mounted. */
  onMount?: (page: Page) => Promise<void>;
  /**
   * List of different variations of Storybook global inputs that change the rendering of the story (like language or theme).
   *
   * Each variant will result in a new screenshot.
   */
  variants?: VrtVariant<TVariant>[];
  /**
   * The viewport to use for the test.
   *
   * Each viewport will result in a new screenshot.
   */
  viewports?: VrtViewport[];
};

export type VrtPlanSpecification = {
  id: string;
  url: string;
  threshold?: number;
  viewport: Pick<VrtViewport, 'height' | 'width'>;
  onMount?: (page: Page) => Promise<void>;
};

export type VrtPlan = VrtPlanSpecification & {
  test: (page: Page, testInfo: TestInfo) => Promise<void>;
};
