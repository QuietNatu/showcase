import { assertInInjectionContext, effect, isSignal, Signal, untracked } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Manages observable side effects.
 * Automatically subscribes and unsubscribes from observables.
 */
export function registerEffect<T>(
  value: Observable<T>,
  callback?: Partial<Observer<T>> | ((value: T) => void),
): void;
/**
 * Manages signal side effects.
 * Registers signals via {@link effect} and untracks the callback.
 */
export function registerEffect<T>(value: Signal<T>, callback: (value: T) => void): void;
/**
 * Manages side effects based on an observable or a signal. Does not react to changes inside the callback function.
 *
 * **In case of an observable:**
 * Automatically subscribes and unsubscribes from observables.
 *
 * **In case of a signal:**
 * Untracks the callback.
 */
export function registerEffect<T>(
  value: Observable<T> | Signal<T>,
  callback?: Partial<Observer<T>> | ((value: T) => void),
): void {
  if (isSignal(value)) {
    registerSignal(value, callback as (value: T) => void);
  } else {
    registerObservable(value, callback);
  }
}

function registerObservable<T>(
  value: Observable<T>,
  callback?: Partial<Observer<T>> | ((value: T) => void),
): void {
  assertInInjectionContext(registerEffect);

  value.pipe(takeUntilDestroyed()).subscribe(callback);
}

function registerSignal<T>(value: Signal<T>, callback: (value: T) => void) {
  effect(() => {
    const currentValue = value();
    untracked(() => {
      callback(currentValue);
    });
  });
}
