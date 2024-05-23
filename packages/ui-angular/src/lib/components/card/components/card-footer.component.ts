import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

type Size = 'small' | 'medium';

@Component({
  selector: 'natu-card-footer,[natu-card-footer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'natu-card__footer',
    '[class.natu-card__footer--small]': 'size() === "small"',
    '[class.natu-card__footer--with-divider]': 'hasDivider()',
  },
})
export class NatuCardFooterComponent {
  readonly size = input<Size>('medium');
  readonly hasDivider = input(false, { transform: booleanAttribute });
}
