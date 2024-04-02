import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, Input, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/**
 * Manages host element's focus ring.
 */
@Directive({
  selector: '[natuFocusRing]',
  standalone: true,
  host: {
    '[class]': 'focusVisibleClass && isFocusVisible() ? focusVisibleClass : null',
  },
})
export class NatuFocusRingDirective {
  @Input({ alias: 'natuFocusRingFocusVisibleClass' }) focusVisibleClass?: string;

  readonly isFocusVisible: Signal<boolean>;

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly focusMonitor = inject(FocusMonitor); // Change this once CDK directives are standalone...

  constructor() {
    this.isFocusVisible = this.getIsFocusVisible();
  }

  private getIsFocusVisible() {
    const isFocusVisible$ = this.focusMonitor
      .monitor(this.elementRef.nativeElement)
      .pipe(map((origin) => origin === 'keyboard' || origin === 'program'));

    return toSignal(isFocusVisible$, { initialValue: false });
  }
}
