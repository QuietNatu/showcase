import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-sidebar-group-label',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuSidebarGroupLabelComponent {}
