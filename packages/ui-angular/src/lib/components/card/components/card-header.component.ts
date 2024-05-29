import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Signal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

type Size = 'small' | 'medium';

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

  private readonly configService = inject(NatuCardHeaderComponentConfigService, {
    self: true,
    optional: true,
  });

  constructor() {
    this.finalSize = computed(() => this.configService?.size() ?? this.size());
  }
}

@Injectable()
export class NatuCardHeaderComponentConfigService {
  readonly size = signal<Size | undefined>(undefined);
}
