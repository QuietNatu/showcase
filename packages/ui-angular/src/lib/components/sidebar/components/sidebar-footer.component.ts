import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';

/* TODO: rename */
@Component({
  selector: 'natu-sidebar-footer',
  template: `
    <nav>
      <natu-sidebar-item-list [items]="items()" />
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent],
})
export class NatuSidebarFooterComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);
}
