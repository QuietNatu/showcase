import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-sidebar-header',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'natu-sidebar__header',
  },
})
export class NatuSidebarHeaderComponent {}
