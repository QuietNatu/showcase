import { TestBed } from '@angular/core/testing';
import { controllableSignal } from './controllable-signal';
import { signal } from '@angular/core';

describe(controllableSignal.name, () => {
  it('returns default value for initial uncontrolled state', () => {
    const [value$] = TestBed.runInInjectionContext(() =>
      controllableSignal<string>({
        value$: signal(undefined),
        defaultValue$: signal('test-default'),
        finalValue: 'test-final',
      }),
    );

    TestBed.flushEffects();

    expect(value$()).toBe('test-default');
  });

  it('returns final value for initial uncontrolled state if default value was not provided', () => {
    const [value$] = TestBed.runInInjectionContext(() =>
      controllableSignal<string>({
        value$: signal(undefined),
        finalValue: 'test-final',
      }),
    );

    TestBed.flushEffects();

    expect(value$()).toBe('test-final');
  });

  it('returns value for initial controlled state', () => {
    const [value$] = TestBed.runInInjectionContext(() =>
      controllableSignal<string>({
        value$: signal('test-value'),
        finalValue: 'test-final',
      }),
    );

    TestBed.flushEffects();

    expect(value$()).toBe('test-value');
  });

  it('supports uncontrolled state', () => {
    const onChangeSpy = jasmine.createSpy();

    const [value$, onChange, isControlled$] = TestBed.runInInjectionContext(() =>
      controllableSignal<string>({
        value$: signal(undefined),
        defaultValue$: signal('default-value'),
        onChange: onChangeSpy,
      }),
    );

    TestBed.flushEffects();

    onChange('changed-value');

    TestBed.flushEffects();

    expect(value$()).toBe('changed-value');
    expect(onChangeSpy).toHaveBeenCalledOnceWith('changed-value');
    expect(isControlled$()).toBe(false);
  });

  it('supports controlled state', () => {
    const onChangeSpy = jasmine.createSpy();

    const [value$, onChange, isControlled$] = TestBed.runInInjectionContext(() =>
      controllableSignal<string>({
        value$: signal('controlled-value'),
        onChange: onChangeSpy,
      }),
    );

    TestBed.flushEffects();

    onChange('changed-value');

    TestBed.flushEffects();

    expect(value$()).toBe('controlled-value');
    expect(onChangeSpy).toHaveBeenCalledOnceWith('changed-value');
    expect(isControlled$()).toBe(true);
  });
});
