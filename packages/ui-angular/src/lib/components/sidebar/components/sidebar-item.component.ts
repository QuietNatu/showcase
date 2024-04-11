import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  contentChild,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NatuFocusRingDirective, NatuTooltipDirective } from '../../../directives';
import { NatuSidebarService } from '../services/sidebar.service';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { NatuSidebarGroupPopoverService } from '../services/sidebar-group-popover.service';

/* TODO: document that sidebar already supports router links */
@Component({
  selector: 'natu-sidebar-item,[natu-sidebar-item]',
  template: `
    @if (iconTemplate(); as iconTemplate) {
      <span class="natu-sidebar__item-icon">
        <ng-template [ngTemplateOutlet]="iconTemplate" />
      </span>
    }

    @if (labelTemplate(); as labelTemplate) {
      <span class="natu-sidebar__item-label">
        <ng-template [ngTemplateOutlet]="labelTemplate" />
      </span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    tabindex: '0',
    class: 'natu-sidebar__item',
    '[class.natu-sidebar__item--active]': 'isActive',
  },
  hostDirectives: [NatuTooltipDirective, NatuFocusRingDirective],
})
export class NatuSidebarItemComponent {
  @Input({ transform: booleanAttribute }) isActive = false;

  readonly iconTemplate = contentChild(NatuSidebarIconDirective, { read: TemplateRef });
  readonly labelTemplate = contentChild(NatuSidebarLabelDirective, { read: TemplateRef });

  private readonly sidebarService = inject(NatuSidebarService);
  private readonly tooltipDirective = inject(NatuTooltipDirective, { self: true });
  private readonly focusRingDirective = inject(NatuFocusRingDirective, { self: true });
  private readonly sidebarGroupPopoverService = inject(NatuSidebarGroupPopoverService, {
    optional: true,
  });

  constructor() {
    this.focusRingDirective.focusVisibleClass = 'natu-sidebar__item--focus';

    this.registerSyncTooltip();
  }

  private registerSyncTooltip() {
    const isPopoverItem = Boolean(this.sidebarGroupPopoverService);

    effect(() => {
      const labelTemplate = this.labelTemplate();
      const isExpanded = isPopoverItem || this.sidebarService.isExpanded$();

      untracked(() => {
        this.tooltipDirective.placement = 'right';
        this.tooltipDirective.content = labelTemplate;
        this.tooltipDirective.isDisabled = isExpanded;
      });
    });
  }
}
