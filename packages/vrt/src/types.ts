import { Page } from '@playwright/test';

export interface VrtViewport {
  name: string;
  width: number;
  height: number;
}

export interface VrtScenarioOptions {
  /** The precision threshold between the produced screenshot and the saved screenshot. */
  threshold?: number;
  /** Perform interactions after the page is mounted. */
  onMount?: (page: Page) => Promise<void>;
  /**
   * List of different variations of Storybook global inputs that change the rendering of the story (like language or theme).
   *
   * Each variant will result in a new screenshot.
   */
  variants?: Record<string, unknown>[];
}

export interface VrtScenario extends VrtScenarioOptions {
  /** The name of the story. */
  story: string;
  /** Name to distinguish tests done one the same story. */
  name?: string;
  /**
   * The viewport to use for the test.
   *
   * Each viewport will result in a new screenshot.
   */
  viewports?: VrtViewport[];
}
