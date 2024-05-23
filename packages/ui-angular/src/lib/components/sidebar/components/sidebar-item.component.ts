import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import {
  NatuFocusRingDirective,
  NatuFocusRingDirectiveConfigService,
  NatuTooltipDirective,
  NatuTooltipDirectiveConfigService,
  NatuTooltipTriggerDirective,
  natuTooltipImports,
} from '../../../directives';
import { NatuSidebarService } from '../services/sidebar.service';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { NatuSidebarGroupPopoverService } from '../services/sidebar-group-popover.service';
import { connectSignal } from '../../../utils';

@Component({
  selector: '[natu-sidebar-item]',
  template: `
    @if (iconTemplate(); as iconTemplate) {
      <span class="natu-sidebar__item-icon" aria-hidden="true">
        <ng-template [ngTemplateOutlet]="iconTemplate" />
      </span>
    }

    @if (labelTemplate(); as labelTemplate) {
      <span class="natu-sidebar__item-label">
        <ng-template [ngTemplateOutlet]="labelTemplate" />
      </span>
    }

    <ng-template natuTooltipContent>
      <ng-template [ngTemplateOutlet]="labelTemplate() ?? null" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, natuTooltipImports],
  providers: [NatuTooltipDirectiveConfigService, NatuFocusRingDirectiveConfigService],
  host: {
    class: 'natu-sidebar__item',
    '[class.natu-sidebar__item--active]': 'isActive()',
  },
  hostDirectives: [NatuTooltipDirective, NatuTooltipTriggerDirective, NatuFocusRingDirective],
})
export class NatuSidebarItemComponent {
  readonly isActive = input(false, { transform: booleanAttribute });

  readonly iconTemplate = contentChild(NatuSidebarIconDirective, { read: TemplateRef });
  readonly labelTemplate = contentChild(NatuSidebarLabelDirective, { read: TemplateRef });

  private readonly sidebarService = inject(NatuSidebarService);
  private readonly tooltipDirectiveConfigService = inject(NatuTooltipDirectiveConfigService);
  private readonly focusRingDirectiveConfigService = inject(NatuFocusRingDirectiveConfigService);
  private readonly sidebarGroupPopoverService = inject(NatuSidebarGroupPopoverService, {
    optional: true,
  });

  constructor() {
    this.focusRingDirectiveConfigService.focusVisibleClass.set('natu-sidebar__item--focus');

    this.registerSyncTooltip();
  }

  private registerSyncTooltip() {
    const isPopoverItem = Boolean(this.sidebarGroupPopoverService);

    connectSignal(
      computed(() => isPopoverItem || this.sidebarService.isExpanded$()),
      (isExpanded) => {
        this.tooltipDirectiveConfigService.placement.set('right');
        this.tooltipDirectiveConfigService.isDisabled.set(isExpanded);
      },
    );
  }
}
