import { ChangeDetectionStrategy, Component, TemplateRef, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';

@Component({
  selector: 'natu-sidebar-actions',
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
export class NatuSidebarActionsComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
}
