import { Page } from '@playwright/test';

export interface VrtViewport {
  name: string;
  width: number;
  height: number;
}

export interface VrtScenarioOptions {
  /**
   * The precision threshold between the produced screenshot and the saved screenshot.
   */
  threshold: number;

  /**
   * Perform interactions after the page is mounted.
   */
  onMount?: (page: Page) => Promise<void>;
}

export interface VrtScenario extends VrtScenarioOptions {
  /**
   * the name of the story.
   */
  story: string;
  /**
   * Name to distinguish tests done one the same story.
   */
  name?: string;
  viewports?: VrtViewport[];
}
