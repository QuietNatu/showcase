import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarGroupPopoverService } from '../services/sidebar-group-popover.service';

@Component({
  selector: 'natu-sidebar-group-popover-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  providers: [NatuSidebarGroupPopoverService],
  template: `
    <div class="natu-sidebar__popover">
      <ul class="natu-sidebar__list">
        @for (item of items(); track $index) {
          <li class="natu-sidebar__list-item">
            <ng-template [ngTemplateOutlet]="item" [ngTemplateOutletInjector]="injector" />
          </li>
        }
      </ul>
    </div>
  `,
})
export class NatuSidebarGroupPopoverContentComponent {
  readonly items = input.required<ReadonlyArray<TemplateRef<unknown>>>();

  readonly injector = inject(Injector);
}
