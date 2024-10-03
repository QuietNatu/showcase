import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';

type Size = 'small' | 'medium';

/**
 * The header of the card.
 */
@Component({
  selector: 'natu-card-header,[natu-card-header]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <ng-content select="[natuCardHeaderIcon]" />

    <div class="natu-card__header-content">
      <ng-content />
    </div>
  `,
  host: {
    class: 'natu-card__header',
    '[class.natu-card__header--small]': 'finalSize() === "small"',
  },
})
export class NatuCardHeaderComponent {
  readonly size = input<Size>('medium');

  readonly finalSize: Signal<Size>;

  private readonly data = inject(NATU_CARD_HEADER_DATA, { self: true, optional: true });

  constructor() {
    this.finalSize = computed(() => this.data?.size() ?? this.size());
  }
}

export const NATU_CARD_HEADER_DATA = new InjectionToken<{ size: Signal<Size | undefined> }>(
  'NATU_CARD__HEADER_DATA',
);
