import { ChangeDetectionStrategy, Component, contentChildren, inject } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';
import { NatuSidebarService } from '../sidebar.service';

@Component({
  selector: 'natu-sidebar-footer',
  template: `
    <nav>
      <natu-sidebar-item-list [items]="items()" />
    </nav>

    <button type="button" (click)="sidebarService.toggleExpansion()">Toggle expansion</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent],
})
export class NatuSidebarFooterComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);

  readonly sidebarService = inject(NatuSidebarService);
}
