import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  contentChildren,
  inject,
  signal,
} from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';
import { NatuSidebarItemComponent } from './sidebar-item.component';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { NatuSidebarService } from '../sidebar.service';
import { caretDownIcon } from '@natu/assets/svg/caret-down';
import { createRandomUUID } from '@natu/utils';
import { natuAccordionImports } from '../../../directives';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';

@Component({
  selector: 'natu-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NatuSidebarItemListComponent,
    NatuSidebarItemComponent,
    SvgIconComponent,
    natuAccordionImports,
    NgTemplateOutlet,
  ],
  host: {
    class: 'sidebar__group',
    '[class.sidebar__group--expanded]': 'isGroupExpanded()',
  },
})
export class NatuSidebarGroupComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
  readonly id = `sidebar-group-${createRandomUUID()}`;
  readonly isExpanded;
  readonly isGroupExpanded = signal(false);

  readonly iconTemplate = contentChild(NatuSidebarIconDirective, { read: TemplateRef });
  readonly labelTemplate = contentChild(NatuSidebarLabelDirective, { read: TemplateRef });

  private readonly sidebarService = inject(NatuSidebarService);

  constructor() {
    this.isExpanded = this.sidebarService.isExpanded$;

    injectRegisterIcons([caretDownIcon]);
  }
}
