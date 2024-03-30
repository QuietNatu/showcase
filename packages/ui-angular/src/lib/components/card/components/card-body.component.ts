import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-card-body,[natu-card-body]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'natu-card__body',
  },
})
export class NatuCardBodyComponent {}
