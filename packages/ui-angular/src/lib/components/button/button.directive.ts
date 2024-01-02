import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Signal,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { fromEvent } from 'rxjs';
import { rxEffects } from '@rx-angular/state/effects';
import { FocusMonitor } from '@angular/cdk/a11y';

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
    '[class]': 'class$()',
    '[class.natu-button--focus-visible]': 'isFocusVisible$()',
    '[class.natu-button--disabled]': 'isDisabled',
    '[attr.aria-disabled]': 'isDisabled',
  },
})
export class NatuButtonDirective {
  @Input({ transform: booleanAttribute }) isDisabled = false;

  @Input() set variant(variant: NatuButtonVariants['variant']) {
    this.variant$.set(variant);
  }

  @Input() set size(size: NatuButtonVariants['size']) {
    this.size$.set(size);
  }

  readonly class$: Signal<string>;
  readonly isActive$ = signal(false);
  readonly isFocusVisible$ = signal(false);

  private readonly variant$ = signal<NatuButtonVariants['variant']>('primary');
  private readonly size$ = signal<NatuButtonVariants['size']>('medium');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly effects = rxEffects();
  private readonly focusMonitor = inject(FocusMonitor); // Change this once CDK directives are standalone...

  constructor() {
    this.class$ = computed(() => buttonVariants({ variant: this.variant$(), size: this.size$() }));

    this.registerStopDisabledClicks();
    this.registerManageFocusVisible();
  }

  /**
   * Disabling controls is bad for a11y. So events should be ignored instead.
   */
  private registerStopDisabledClicks() {
    this.ngZone.runOutsideAngular(() => {
      // Cannot be done via host bind otherwise this handler will not be the first one to be ran.
      const click$ = fromEvent(this.elementRef.nativeElement, 'click', { capture: true });

      this.effects.register(click$, (event) => {
        if (this.isDisabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    });
  }

  private registerManageFocusVisible() {
    this.effects.register(this.focusMonitor.monitor(this.elementRef.nativeElement), (origin) => {
      this.isFocusVisible$.set(origin === 'keyboard');
    });
  }
}

@Directive({
  selector: '[natuButton]:not(button)',
  standalone: true,
  host: {
    role: 'button',
    '[class.natu-button--active]': 'isActive$()',
    '[attr.tabindex]': '!disabled ? 0 : null',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    '(click)': '!isDisabled && natuButtonClick.emit($event)',
    '(keydown.enter)': '!isDisabled && natuButtonClick.emit($event)',
    '(keydown.space)': '!isDisabled && natuButtonClick.emit($event)',
    '(mousedown)': '!isDisabled && isActive$.set(true)',
    '(mouseup)': '!isDisabled && isActive$.set(false)',
  },
})
export class NatuA11yButtonDirective {
  @Input({ transform: booleanAttribute }) isDisabled = false;

  // Workaround because of this https://github.com/angular/angular/issues/4059
  @Output() natuButtonClick = new EventEmitter<Event>();

  readonly isActive$ = signal(false);
}

export const natuButtonImports = [NatuButtonDirective, NatuA11yButtonDirective];
