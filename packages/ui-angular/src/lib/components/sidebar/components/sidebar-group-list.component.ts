import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';

@Component({
  selector: 'natu-sidebar-group-list',
  template: `<natu-sidebar-item-list [items]="items()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent],
})
export class NatuSidebarGroupListComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);
}
