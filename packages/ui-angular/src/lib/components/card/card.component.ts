import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardBodyComponent } from './components/card-body.component';
import { NatuCardFooterComponent } from './components/card-footer.component';
import { NatuCardHeaderIconDirective } from './directives/card-header-icon.directive';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { xIcon } from '@natu/assets/svg/x';
import { natuButtonImports } from '../../directives';
import { NatuTranslationDirective } from '../../i18n';

@Component({
  selector: 'natu-card,[natu-card]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, SvgIconComponent, NatuTranslationDirective],
  template: `
    <ng-content select="natu-card-header,[natu-card-header]" />
    <ng-content />
    <ng-content select="natu-card-footer,[natu-card-footer]" />

    @if (finalIsDismissable()) {
      <!-- TODO: check if object keyprefix creates multiple rerenders -->
      <button
        *natuTranslation="{ keyPrefix: 'ui.card' }; let t"
        type="button"
        natuButton
        [isIconButton]="true"
        [variant]="'ghost'"
        [size]="'small'"
        class="natu-card__dismiss"
        (click)="dismiss.emit()"
      >
        <span class="natu-visually-hidden">{{ t('dismiss') }}</span>
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

  private readonly data = inject(NATU_CARD_DATA, { self: true, optional: true });

  constructor() {
    injectRegisterIcons([xIcon]);

    this.finalIsEmbedded = computed(() => this.data?.isEmbedded() ?? this.isEmbedded());
    this.finalIsDismissable = computed(() => this.data?.isDismissable() ?? this.isDismissable());
  }
}

export const NATU_CARD_DATA = new InjectionToken<{
  isEmbedded: Signal<boolean | undefined>;
  isDismissable: Signal<boolean | undefined>;
}>('NATU_CARD_DATA');

export const natuCardImports = [
  NatuCardComponent,
  NatuCardHeaderComponent,
  NatuCardHeaderIconDirective,
  NatuCardBodyComponent,
  NatuCardFooterComponent,
] as const;
