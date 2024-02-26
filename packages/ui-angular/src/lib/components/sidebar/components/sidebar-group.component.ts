import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-sidebar-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuSidebarGroupComponent {}
