import { useState } from 'react';

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
): [value: T, onChange: (value: T) => void, isControlled: boolean] {
  const { value, defaultValue, finalValue, onChange = () => {} } = options;

  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue === undefined ? finalValue : defaultValue,
  );

  const handleUncontrolledChange = (val: T) => {
    setUncontrolledValue(val);
    onChange(val);
  };

  return value === undefined
    ? [uncontrolledValue as T, handleUncontrolledChange, false]
    : [value as T, onChange, true];
}
