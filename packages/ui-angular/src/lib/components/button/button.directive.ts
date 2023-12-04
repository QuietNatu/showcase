import {
  Directive,
  EventEmitter,
  Input,
  Output,
  Signal,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva('natu-button', {
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
  },
})
export class NatuButtonDirective {
  @Input() set variant(variant: NatuButtonVariants['variant']) {
    this.variant$.set(variant);
  }

  @Input() set size(size: NatuButtonVariants['size']) {
    this.size$.set(size);
  }

  readonly class$: Signal<string>;

  private readonly variant$ = signal<NatuButtonVariants['variant']>('primary');
  private readonly size$ = signal<NatuButtonVariants['size']>('medium');

  constructor() {
    this.class$ = computed(() => buttonVariants({ variant: this.variant$(), size: this.size$() }));
  }
}

@Directive({
  selector: '[natuButton]:not(button)',
  standalone: true,
  host: {
    role: 'button',
    '[class.natu-button--active]': 'isActive$()',
    '[class.natu-button--disabled]': 'disabled',
    '[attr.tabindex]': '!disabled ? 0 : null',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    '(click)': '!disabled && natuButtonClick.emit($event)',
    '(keydown.enter)': '!disabled && natuButtonClick.emit($event)',
    '(keydown.space)': '!disabled && natuButtonClick.emit($event)',
    '(mousedown)': '!disabled && isActive$.set(true)',
    '(mouseup)': '!disabled && isActive$.set(false)',
  },
})
export class NatuA11yButtonDirective {
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() natuButtonClick = new EventEmitter<Event>();

  readonly isActive$ = signal(false);
}

export const natuButtonImports = [NatuButtonDirective, NatuA11yButtonDirective];
