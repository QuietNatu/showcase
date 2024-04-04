import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  TemplateRef,
  inject,
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { NATU_IS_SIDEBAR_GROUP_POPOVER } from '../sidebar-tokens';

@Component({
  selector: 'natu-sidebar-group-popover-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  providers: [{ provide: NATU_IS_SIDEBAR_GROUP_POPOVER, useValue: true }],
  template: `
    <div class="sidebar__popover sidebar__group-list">
      <ul class="sidebar__list">
        @for (item of items; track $index) {
          <li class="sidebar__list-item">
            <ng-template [ngTemplateOutlet]="item" [ngTemplateOutletInjector]="injector" />
          </li>
        }
      </ul>
    </div>
  `,
})
export class NatuSidebarGroupPopoverContentComponent {
  @Input({ required: true }) items!: ReadonlyArray<TemplateRef<unknown>>;

  readonly injector = inject(Injector);
}
