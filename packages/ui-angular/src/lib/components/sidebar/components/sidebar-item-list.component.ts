import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

/* TODO: remove this? */
@Component({
  selector: 'natu-sidebar-item-list',
  template: `
    <ul class="sidebar__list">
      @for (item of items; track $index) {
        <li class="sidebar__list-item">
          <ng-template [ngTemplateOutlet]="item" />
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuSidebarItemListComponent {
  @Input({ required: true }) items!: readonly TemplateRef<unknown>[];
}
