import { ChangeDetectionStrategy, Component, TemplateRef, contentChildren } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NgTemplateOutlet } from '@angular/common';
import { NatuTranslationDirective } from '../../../i18n';

@Component({
  selector: 'natu-sidebar-actions',
  template: `
    <nav *natuTranslation="let t; keyPrefix: 'ui.sidebar'" [attr.aria-label]="t('section.main')">
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
  imports: [NgTemplateOutlet, NatuTranslationDirective],
  host: {
    class: 'natu-sidebar__body',
  },
})
export class NatuSidebarActionsComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
}
