import { Signal, computed, effect, signal, untracked } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/* TODO: replace this with linkedsignal */

interface CreateControllableSignalOptions<T> {
  /** Value for controlled state */
  value: Signal<T | undefined>;

  /** Default value for uncontrolled state */
  defaultValue?: Signal<T | undefined>;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;
}

/**
 * Manage state of both controlled and uncontrolled components.
 */
export function controllableSignal<T>(options: CreateControllableSignalOptions<T>): {
  value: Signal<T>;
  change: (value: T) => void;
  valueChange$: Observable<T>;
  isControlled: Signal<boolean>;
} {
  const { value: controlledValue$, defaultValue: defaultValue$, finalValue } = options;

  const uncontrolledValue$ = signal(finalValue);
  const valueChange$ = new Subject<T>();

  // eslint-disable-next-line functional/no-let
  let hasDefaultValueBeenSet = false;

  effect(() => {
    const defaultValue = defaultValue$?.();

    if (!hasDefaultValueBeenSet && defaultValue !== undefined) {
      hasDefaultValueBeenSet = true;
      untracked(() => {
        uncontrolledValue$.set(defaultValue);
      });
    }
  });

  const isControlled$ = computed(() => controlledValue$() !== undefined);

  const value$ = computed(() => {
    const controlledValue = controlledValue$();
    const uncontrolledValue = uncontrolledValue$();

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return controlledValue === undefined ? (uncontrolledValue as T) : controlledValue;
  });

  const change = (value: T) => {
    const isControlled = isControlled$();

    if (!isControlled) {
      uncontrolledValue$.set(value);
    }

    valueChange$.next(value);
  };

  return { value: value$, change, valueChange$, isControlled: isControlled$ };
}
