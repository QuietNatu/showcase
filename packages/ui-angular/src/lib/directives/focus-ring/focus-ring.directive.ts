import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  Injectable,
  Signal,
  computed,
  inject,
  input,
  signal,
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
  private readonly configService = inject(NatuFocusRingDirectiveConfigService, {
    optional: true,
    self: true,
  });

  constructor() {
    this.isFocusVisible = this.getIsFocusVisible();
    this.finalFocusVisibleClass = computed(
      () => this.configService?.focusVisibleClass() ?? this.focusVisibleClass(),
    );
  }

  private getIsFocusVisible() {
    const isFocusVisible$ = this.focusMonitor
      .monitor(this.elementRef.nativeElement)
      .pipe(map((origin) => origin === 'keyboard' || origin === 'program'));

    return toSignal(isFocusVisible$, { initialValue: false });
  }
}

@Injectable()
export class NatuFocusRingDirectiveConfigService {
  readonly focusVisibleClass = signal<string | undefined>(undefined);
}
