import { Signal, computed, effect, signal, untracked } from '@angular/core';

interface CreateControllableSignalOptions<T> {
  /** Value for controlled state */
  value$: Signal<T | undefined>;

  /** Default value for uncontrolled state */
  defaultValue$?: Signal<T | undefined>;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;

  /** Controlled state onChange handler */
  onChange?: (value: T) => void;
}

/**
 * Manage state of both controlled and uncontrolled components.
 */
export function controllableSignal<T>(options: CreateControllableSignalOptions<T>): {
  value$: Signal<T>;
  change: (value: T) => void;
  isControlled$: Signal<boolean>;
} {
  const { value$: controlledValue$, defaultValue$, finalValue, onChange = () => {} } = options;

  const uncontrolledValue$ = signal(finalValue);

  // eslint-disable-next-line functional/no-let
  let hasDefaultValueBeenSet = false;

  effect(() => {
    const defaultValue = defaultValue$?.();

    if (!hasDefaultValueBeenSet && defaultValue !== undefined) {
      hasDefaultValueBeenSet = true;
      untracked(() => uncontrolledValue$.set(defaultValue));
    }
  });

  const isControlled$ = computed(() => controlledValue$() !== undefined);

  const value$ = computed(() => {
    const controlledValue = controlledValue$();
    const uncontrolledValue = uncontrolledValue$();

    return controlledValue === undefined ? (uncontrolledValue as T) : controlledValue;
  });

  const change = (value: T) => {
    const isControlled = isControlled$();

    if (!isControlled) {
      uncontrolledValue$.set(value);
    }

    onChange(value);
  };

  return { value$, change, isControlled$ };
}
