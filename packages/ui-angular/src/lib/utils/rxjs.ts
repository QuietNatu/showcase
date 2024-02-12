import { assertInInjectionContext } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Manages side effects based on observables. Automatically subscribes and unsubscribes from observables.
 */
export function registerEffect<T>(
  observable$: Observable<T>,
  observer?: Partial<Observer<T>> | ((value: T) => void),
): void {
  assertInInjectionContext(registerEffect);

  observable$.pipe(takeUntilDestroyed()).subscribe(observer);
}
