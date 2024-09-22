import { SetStateAction, useState } from 'react';

interface UseControllableStateOptions<T> {
  /** Value for controlled state */
  value?: T;

  /** Default value for uncontrolled state */
  defaultValue?: T;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;

  /** Controlled state onChange handler */
  onChange?: (value: T) => void;
}

/**
 * Manage state of both controlled and uncontrolled components.
 *
 * Based on: https://github.com/mantinedev/mantine/blob/7.4.1/packages/%40mantine/hooks/src/use-uncontrolled/use-uncontrolled.ts
 */
export function useControllableState<T>(
  options: UseControllableStateOptions<T>,
): [value: T, onChange: (value: SetStateAction<T>) => void, isControlled: boolean] {
  const { value, defaultValue, finalValue, onChange = () => {} } = options;

  const [uncontrolledValue, setUncontrolledValue] = useState(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    defaultValue === undefined ? finalValue : defaultValue,
  );

  const isUncontrolled = value === undefined;
  const currentValue = isUncontrolled ? (uncontrolledValue as T) : (value as T);

  const handleChange = (action: SetStateAction<T>) => {
    const nextValue = getStateActionValue(currentValue, action);

    if (isUncontrolled) {
      setUncontrolledValue(nextValue);
    }

    onChange(nextValue);
  };

  return [currentValue, handleChange, !isUncontrolled];
}

function getStateActionValue<T>(previousValue: T, action: SetStateAction<T>) {
  return typeof action === 'function' ? (action as (prevValue: T) => T)(previousValue) : action;
}
