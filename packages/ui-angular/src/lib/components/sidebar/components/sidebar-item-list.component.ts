import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'natu-sidebar-item-list',
  template: `<ul>
    <!-- TODO: track by -->
    @for (item of items; track $index) {
      <li>
        <ng-template [ngTemplateOutlet]="item" />
      </li>
    }
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuSidebarItemListComponent {
  @Input({ required: true }) items!: ReadonlyArray<TemplateRef<unknown>>;
}
