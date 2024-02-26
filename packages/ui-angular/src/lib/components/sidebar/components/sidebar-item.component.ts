import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NatuSidebarService } from '../sidebar.service';

@Component({
  selector: 'natu-sidebar-item,[natu-sidebar-item]',
  template: `
    <ng-content select="[natuSidebarItemIcon]" />

    @if (isExpanded$()) {
      <ng-content select="[natuSidebarItemLabel]" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuSidebarItemComponent {
  readonly isExpanded$;

  private readonly sidebarService = inject(NatuSidebarService);

  constructor() {
    this.isExpanded$ = this.sidebarService.isExpanded$;
  }
}
