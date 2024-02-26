import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';

@Component({
  selector: 'natu-sidebar-item-list',
  template: `<ul>
    @for (item of items; track $index) {
      <li>
        <ng-template [ngTemplateOutlet]="item.templateRef" />

        @if (item.items().length > 0) {
          <natu-sidebar-item-list [items]="item.items()" />
        }
      </li>
    }
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuSidebarItemListComponent {
  @Input({ required: true }) items!: readonly NatuSidebarItemDirective[];
}
