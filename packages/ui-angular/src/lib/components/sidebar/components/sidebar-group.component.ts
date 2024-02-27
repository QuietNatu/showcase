import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';
import { NatuSidebarItemComponent } from './sidebar-item.component';

@Component({
  selector: 'natu-sidebar-group',
  template: `
    <div class="sidebar__item">
      <ng-content select="[natuSidebarGroupIcon]" />
      <ng-content select="[natuSidebarGroupLabel]" />
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
  readonly items = contentChildren(NatuSidebarItemDirective);
}
