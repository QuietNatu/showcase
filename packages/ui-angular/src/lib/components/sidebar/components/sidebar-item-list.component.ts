import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';

@Component({
  selector: 'natu-sidebar-item-list',
  template: `
    <ul class="sidebar__list">
      @for (item of items; track $index) {
        <li class="sidebar__list-item">
          <ng-template [ngTemplateOutlet]="item.templateRef" />
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuSidebarItemListComponent {
  @Input({ required: true }) items!: readonly NatuSidebarItemDirective[];
}
