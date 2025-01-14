import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  contentChild,
  contentChildren,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { NatuSidebarService } from '../services/sidebar.service';
import {
  NatuFocusRingDirective,
  natuDisclosureImports,
  natuCardPopoverImports,
  natuTooltipImports,
} from '../../../directives';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';
import { NatuSidebarGroupPopoverContentComponent } from './sidebar-group-popover-content.component';

/**
 * Displays a group of sidebar items.
 */
@Component({
  selector: 'natu-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NatuFocusRingDirective,
    SvgIconComponent,
    natuDisclosureImports,
    NgTemplateOutlet,
    natuTooltipImports,
    natuCardPopoverImports,
    NatuSidebarGroupPopoverContentComponent,
  ],
  host: {
    class: 'natu-sidebar__group',
    '[class.natu-sidebar__group--expanded]': 'isGroupExpanded()',
    '[class.natu-sidebar__group--collapsed]': '!isGroupExpanded()',
    '[class.natu-sidebar__group--hidden]': '!isGroupHidden()',
  },
})
export class NatuSidebarGroupComponent {
  readonly items = contentChildren(NatuSidebarItemDirective, { read: TemplateRef });
  readonly isExpanded;

  readonly isGroupPresent = signal(false);
  readonly isGroupHidden = signal(false);
  readonly isGroupExpanded = signal(false);

  readonly isGroupPopoverOpen = signal(false);

  readonly iconTemplate = contentChild(NatuSidebarIconDirective, { read: TemplateRef });
  readonly labelTemplate = contentChild(NatuSidebarLabelDirective, { read: TemplateRef });

  private readonly sidebarService = inject(NatuSidebarService);
  private readonly groupListRef = viewChild<ElementRef<HTMLElement>>('groupList');

  constructor() {
    this.isExpanded = this.sidebarService.isExpanded;
  }

  handleGroupExpandedChange(isGroupExpanded: boolean) {
    this.isGroupExpanded.set(isGroupExpanded);

    if (!this.groupHasAnimation()) {
      this.isGroupPresent.set(isGroupExpanded);
      this.isGroupHidden.set(!isGroupExpanded);
    } else if (isGroupExpanded) {
      this.isGroupPresent.set(isGroupExpanded);
    } else {
      this.isGroupHidden.set(isGroupExpanded);
    }
  }

  handleGroupTransitionEnd() {
    const isGroupExpanded = this.isGroupExpanded();

    this.isGroupHidden.set(isGroupExpanded);
    this.isGroupPresent.set(isGroupExpanded);
  }

  private groupHasAnimation() {
    const groupListRef = this.groupListRef();

    return groupListRef && Boolean(window.getComputedStyle(groupListRef.nativeElement).transition);
  }
}
