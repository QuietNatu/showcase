import { ChangeDetectionStrategy, Component, TemplateRef, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'natu-sidebar-secondary-actions',
  template: `
    <!-- TODO: add i18n once implemented -->
    <nav [attr.aria-label]="'Secondary'">
      <ul class="sidebar__list">
        @for (item of items(); track $index) {
          <li class="sidebar__list-item">
            <ng-template [ngTemplateOutlet]="item" />
          </li>
        }
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuSidebarSecondaryActionsComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
}
