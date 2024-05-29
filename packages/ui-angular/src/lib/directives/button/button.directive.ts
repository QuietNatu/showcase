import {
  Directive,
  ElementRef,
  NgZone,
  Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { fromEvent } from 'rxjs';
import { registerEffect } from '../../utils/rxjs';
import {
  NatuFocusRingDirective,
  NatuFocusRingDirectiveConfigService,
} from '../focus-ring/focus-ring.directive';

const buttonVariants = cva('natu-button', {
  variants: {
    variant: {
      primary: 'natu-button--primary',
      destructive: 'natu-button--destructive',
      outline: 'natu-button--outline',
      'outline-destructive': 'natu-button--outline-destructive',
      ghost: 'natu-button--ghost',
      'ghost-destructive': 'natu-button--ghost-destructive',
      'ghost-muted': 'natu-button--ghost-muted',
    },
    size: {
      small: 'natu-button--small',
      medium: 'natu-button--medium',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type NatuButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[natuButton]',
  standalone: true,
  host: {
    '[class]': 'class()',
    '[class.natu-button--disabled]': 'isDisabled()',
    '[class.natu-button--icon]': 'isIconButton()',
    '[attr.aria-disabled]': 'isDisabled()',
  },
  hostDirectives: [NatuFocusRingDirective],
  providers: [NatuFocusRingDirectiveConfigService],
})
export class NatuButtonDirective {
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly isIconButton = input(false, { transform: booleanAttribute });
  readonly variant = input<NatuButtonVariants['variant']>('primary');
  readonly size = input<NatuButtonVariants['size']>('medium');

  readonly class: Signal<string>;

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly focusRingDirectiveConfigService = inject(NatuFocusRingDirectiveConfigService);

  constructor() {
    this.focusRingDirectiveConfigService.focusVisibleClass.set('natu-button--focus');
    this.class = computed(() => buttonVariants({ variant: this.variant(), size: this.size() }));

    this.registerStopDisabledClicks();
  }

  /**
   * Disabling controls is bad for a11y. So events should be ignored instead.
   */
  private registerStopDisabledClicks() {
    this.ngZone.runOutsideAngular(() => {
      // Cannot be done via host bind otherwise this handler will not be the first one to be ran.
      const click$ = fromEvent(this.elementRef.nativeElement, 'click', { capture: true });

      registerEffect(click$, (event) => {
        if (this.isDisabled()) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    });
  }
}

@Directive({
  selector: '[natuButton]:not(button)',
  standalone: true,
  host: {
    role: 'button',
    '[class.natu-button--active]': 'isActive()',
    '[attr.tabindex]': '0',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    '(click)': '!isDisabled() && natuButtonClick.emit($event)',
    '(keydown.enter)': '!isDisabled() && natuButtonClick.emit($event)',
    '(keydown.space)': '!isDisabled() && natuButtonClick.emit($event)',
    '(mousedown)': '!isDisabled() && isActive.set(true)',
    '(mouseup)': '!isDisabled() && isActive.set(false)',
  },
})
export class NatuA11yButtonDirective {
  readonly isDisabled = input(false, { transform: booleanAttribute });

  // Workaround because of this https://github.com/angular/angular/issues/4059
  readonly natuButtonClick = output<Event>();

  readonly isActive = signal(false);
}

export const natuButtonImports = [NatuButtonDirective, NatuA11yButtonDirective] as const;
