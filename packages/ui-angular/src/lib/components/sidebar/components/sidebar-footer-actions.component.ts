import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';

@Component({
  selector: 'natu-sidebar-footer-actions',
  template: `
    <nav>
      <natu-sidebar-item-list [items]="items()" />
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent],
})
export class NatuSidebarFooterActionsComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);
}
