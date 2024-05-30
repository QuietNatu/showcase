import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  InjectionToken,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/**
 * Manages host element's focus ring.
 */
@Directive({
  selector: '[natuFocusRing]',
  standalone: true,
  host: {
    '[class]': 'finalFocusVisibleClass() && isFocusVisible() ? finalFocusVisibleClass() : null',
  },
})
export class NatuFocusRingDirective {
  readonly focusVisibleClass = input<string | undefined>(undefined, {
    alias: 'natuFocusRingFocusVisibleClass',
  });

  readonly isFocusVisible: Signal<boolean>;
  readonly finalFocusVisibleClass: Signal<string | undefined>;

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly focusMonitor = inject(FocusMonitor); // Change this once CDK directives are standalone...
  private readonly data = inject(NATU_FOCUS_RING_DATA, { optional: true, self: true });

  constructor() {
    this.isFocusVisible = this.getIsFocusVisible();
    this.finalFocusVisibleClass = computed(
      () => this.data?.focusVisibleClass() ?? this.focusVisibleClass(),
    );
  }

  private getIsFocusVisible() {
    const isFocusVisible$ = this.focusMonitor
      .monitor(this.elementRef.nativeElement)
      .pipe(map((origin) => origin === 'keyboard' || origin === 'program'));

    return toSignal(isFocusVisible$, { initialValue: false });
  }
}

export const NATU_FOCUS_RING_DATA = new InjectionToken<{
  focusVisibleClass: Signal<string | undefined>;
}>('NATU_FOCUS_RING_DATA');
