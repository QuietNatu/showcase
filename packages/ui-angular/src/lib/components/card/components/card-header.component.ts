import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NatuCardService } from '../card.service';

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
    '[class.natu-card__header--small]': 'size === "small"',
  },
})
export class NatuCardHeaderComponent {
  @Input() size: 'small' | 'medium' = 'medium';

  readonly cardService = inject(NatuCardService);
}
