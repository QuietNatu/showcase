import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';

/* TODO: rename */
@Component({
  selector: 'natu-sidebar-body',
  template: `
    <nav>
      <natu-sidebar-item-list [items]="items()" />
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent],
  host: {
    class: 'sidebar__body',
  },
})
export class NatuSidebarBodyComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);
}
