import { ChangeDetectionStrategy, Component, contentChildren, inject } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';
import { NatuSidebarItemComponent } from './sidebar-item.component';
import { NatuSidebarService } from '../sidebar.service';

@Component({
  selector: 'natu-sidebar-group',
  template: `
    <div>
      <ng-content select="[natuSidebarGroupIcon]" />

      @if (isExpanded$()) {
        <ng-content select="[natuSidebarGroupLabel]" />
      }
    </div>

    <div>
      <natu-sidebar-item-list [items]="items()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent, NatuSidebarItemComponent],
})
export class NatuSidebarGroupComponent {
  readonly isExpanded$;
  readonly items = contentChildren(NatuSidebarItemDirective);

  private readonly sidebarService = inject(NatuSidebarService);

  constructor() {
    this.isExpanded$ = this.sidebarService.isExpanded$;
  }
}
