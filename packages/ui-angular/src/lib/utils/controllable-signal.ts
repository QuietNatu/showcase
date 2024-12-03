import { Signal, computed, linkedSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface CreateControllableSignalOptions<T> {
  /** Value for controlled state */
  value: Signal<T | undefined>;

  /** Default value for uncontrolled state */
  defaultValue?: Signal<T | undefined>;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue: T;
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
  const { value: controlledValue, defaultValue, finalValue } = options;

  const valueSignal = linkedSignal<T | undefined, T | undefined>({
    source: controlledValue,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    computation: (value, previous) => (value === undefined ? previous?.value : value),
  });

  const value = computed<T>(() => {
    const currentValue = valueSignal();

    if (currentValue !== undefined) {
      return currentValue;
    } else {
      const currentDefaultValue = defaultValue?.();
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return currentDefaultValue === undefined ? finalValue : currentDefaultValue;
    }
  });

  const valueChange$ = new Subject<T>();

  const isControlled = computed(() => controlledValue() !== undefined);

  const change = (value: T) => {
    if (!isControlled()) {
      valueSignal.set(value);
    }

    valueChange$.next(value);
  };

  return { value, change, valueChange$, isControlled: isControlled };
}
