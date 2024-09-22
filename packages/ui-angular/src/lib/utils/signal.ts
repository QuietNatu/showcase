import { Signal, effect, untracked } from '@angular/core';

/**
 * Used to update some data based on a signal, while also untracking the update.
 *
 * So this:
 *
 * ```
 * effect(() => {
 *   const isExpanded = this.isExpanded();
 *
 *   untracked(() => {
 *     this.sidebarService.setIsExpanded(isExpanded);
 *   });
 * });
 *
 * ```
 *
 * can be reduced to this:
 *
 * ```
 * connectSignal(this.isExpanded, (isExpanded) => {
 *   this.sidebarService.setIsExpanded(isExpanded);
 * });
 * ```
 */
export function connectSignal<T>(signalValue: Signal<T>, callback: (value: T) => void) {
  effect(() => {
    const value = signalValue();
    untracked(() => {
      callback(value);
    });
  });
}
