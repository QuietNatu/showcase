import { Meta } from '@storybook/angular';

/**
 * Represents all the props of a component without being wrapped in signals.
 *
 * Useful for testing to create setup function to be passed to templates.
 */
export type TestComponentArgs<T> = Meta<T>['args'];
