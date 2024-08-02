import { renderHook } from '../../test/render';
import { act } from '@testing-library/react';
import { useControllableState } from './use-controllable-state';

test('returns default value for initial uncontrolled state', () => {
  const { result } = renderHook(() =>
    useControllableState({
      value: undefined,
      defaultValue: 'test-default',
      finalValue: 'test-final',
    }),
  );

  expect(result.current[0]).toBe('test-default');
});

test('returns final value for initial uncontrolled state if default value was not provided', () => {
  const { result } = renderHook(() =>
    useControllableState({
      value: undefined,
      defaultValue: undefined,
      finalValue: 'test-final',
    }),
  );

  expect(result.current[0]).toBe('test-final');
});

test('returns value for initial controlled state', () => {
  const { result } = renderHook(() =>
    useControllableState({
      value: 'test-value',
      defaultValue: 'test-default',
      finalValue: 'test-final',
    }),
  );

  expect(result.current[0]).toBe('test-value');
});

test('supports uncontrolled state', () => {
  const onChangeSpy = vi.fn();
  const { result } = renderHook(() =>
    useControllableState({
      defaultValue: 'default-value',
      onChange: onChangeSpy,
    }),
  );

  act(() => {
    result.current[1]('changed');
  });

  act(() => {
    result.current[1]((previousValue) => `${previousValue}-value`);
  });

  expect(result.current[0]).toBe('changed-value');
  expect(onChangeSpy).toHaveBeenCalledTimes(2);
  expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'changed');
  expect(onChangeSpy).toHaveBeenNthCalledWith(2, 'changed-value');
  expect(result.current[2]).toBe(false);
});

test('supports controlled state', () => {
  const onChangeSpy = vi.fn();
  const { result } = renderHook(() =>
    useControllableState({
      value: 'controlled-value',
      onChange: onChangeSpy,
    }),
  );

  act(() => {
    result.current[1]('changed-value');
  });

  act(() => {
    result.current[1]((previousValue) => `${previousValue}-value`);
  });

  expect(result.current[0]).toBe('controlled-value');
  expect(onChangeSpy).toHaveBeenCalledTimes(2);
  expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'changed-value');
  expect(onChangeSpy).toHaveBeenNthCalledWith(2, 'controlled-value-value');
  expect(result.current[2]).toBe(true);
});
