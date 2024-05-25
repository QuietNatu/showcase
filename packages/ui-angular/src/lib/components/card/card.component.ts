import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardBodyComponent } from './components/card-body.component';
import { NatuCardFooterComponent } from './components/card-footer.component';
import { NatuCardHeaderIconDirective } from './directives/card-header-icon.directive';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { xIcon } from '@natu/assets/svg/x';
import { natuButtonImports } from '../../directives';

/* TODO: add i18n once implemented */

@Component({
  selector: 'natu-card,[natu-card]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, SvgIconComponent],
  template: `
    <ng-content select="natu-card-header,[natu-card-header]" />
    <ng-content />
    <ng-content select="natu-card-footer,[natu-card-footer]" />

    @if (finalIsDismissable()) {
      <button
        type="button"
        natuButton
        [isIconButton]="true"
        [variant]="'ghost'"
        [size]="'small'"
        class="natu-card__dismiss"
        (click)="dismiss.emit()"
      >
        <span class="natu-visually-hidden">Dismiss</span>
        <svg-icon [key]="'x'" aria-hidden="true" />
      </button>
    }
  `,
  host: {
    class: 'natu-card',
    '[class.natu-card--embedded]': 'finalIsEmbedded()',
  },
})
export class NatuCardComponent {
  /**
   * Whether the card is part of another component or not.
   * Will hide borders, box-shadows, etc if true.
   */
  readonly isEmbedded = input(false, { transform: booleanAttribute });

  /** Whether to show the dismissable button or not. */
  readonly isDismissable = input(false, { transform: booleanAttribute });

  readonly dismiss = output<void>();

  readonly finalIsEmbedded: Signal<boolean>;
  readonly finalIsDismissable: Signal<boolean>;

  private readonly configService = inject(NatuCardComponentConfigService, {
    self: true,
    optional: true,
  });

  constructor() {
    injectRegisterIcons([xIcon]);

    this.finalIsEmbedded = computed(() => this.configService?.isEmbedded() ?? this.isEmbedded());
    this.finalIsDismissable = computed(
      () => this.configService?.isDismissable() ?? this.isDismissable(),
    );
  }
}

@Injectable()
export class NatuCardComponentConfigService {
  readonly isEmbedded = signal<boolean | undefined>(undefined);
  readonly isDismissable = signal<boolean | undefined>(undefined);
}

export const natuCardImports = [
  NatuCardComponent,
  NatuCardHeaderComponent,
  NatuCardHeaderIconDirective,
  NatuCardBodyComponent,
  NatuCardFooterComponent,
] as const;
