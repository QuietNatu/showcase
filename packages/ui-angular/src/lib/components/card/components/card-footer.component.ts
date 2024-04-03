import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'natu-card-footer,[natu-card-footer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'natu-card__footer',
    '[class.natu-card__footer--small]': 'size === "small"',
    '[class.natu-card__footer--with-divider]': 'hasDivider',
  },
})
export class NatuCardFooterComponent {
  @Input() size: 'small' | 'medium' = 'medium';
  @Input({ transform: booleanAttribute }) hasDivider = false;
}
