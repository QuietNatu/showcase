import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NatuCardService } from '../card.service';
import { natuButtonImports } from '../../../directives/button/button.directive';
import { SvgIconComponent } from '@natu/assets';

/* TODO: add tooltip overflow later */
/* TODO: add i18n once implemented */

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
        [isIconButton]="true"
        [variant]="'ghost'"
        [size]="size"
        class="natu-card__dismiss"
        (click)="cardService.dismiss()"
      >
        <span class="natu-visually-hidden">Dismiss</span>
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
