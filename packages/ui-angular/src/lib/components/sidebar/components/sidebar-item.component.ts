import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-sidebar-item,[natu-sidebar-item]',
  template: `
    <ng-content select="[natuSidebarItemIcon]" />

    @if (isExpanded) {
      <ng-content select="[natuSidebarItemLabel]" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuSidebarItemComponent {
  readonly isExpanded = true;
}
