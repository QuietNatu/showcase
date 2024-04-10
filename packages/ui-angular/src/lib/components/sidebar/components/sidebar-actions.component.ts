import { ChangeDetectionStrategy, Component, TemplateRef, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'natu-sidebar-actions',
  template: `
    <!-- TODO: add i18n once implemented -->
    <nav [attr.aria-label]="'Main'">
      <ul class="natu-sidebar__list">
        @for (item of items(); track $index) {
          <li class="natu-sidebar__list-item">
            <ng-template [ngTemplateOutlet]="item" />
          </li>
        }
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'natu-sidebar__body',
  },
})
export class NatuSidebarActionsComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
}
