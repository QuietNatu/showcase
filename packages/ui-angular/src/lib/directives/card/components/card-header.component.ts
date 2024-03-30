import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NatuCardService } from '../card.service';
import { natuButtonImports } from '../../button/button.directive';
import { SvgIconComponent } from '@natu/assets';

/* TODO: add tooltip overflow later */
/* TODO: add i18n once implemented */
/* TODO: icon button */

@Component({
  selector: 'natu-card-header,[natu-card-header]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, SvgIconComponent],
  template: `
    <ng-content select="[natuCardHeaderIcon]" />

    <div class="natu-card__header-content">
      <ng-content />
    </div>

    @if (cardService.isDismissable$()) {
      <button
        type="button"
        natuButton
        [variant]="'ghost'"
        class="natu-card__dismiss"
        (click)="cardService.dismiss()"
      >
        <!-- TODO: visually hidden i18n -->

        <svg-icon [key]="'x'" aria-hidden="true" />
      </button>
    }
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
