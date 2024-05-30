import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  NATU_FOCUS_RING_DATA,
  NATU_TOOLTIP_DATA,
  NatuFocusRingDirective,
  NatuTooltipDirective,
  NatuTooltipTriggerDirective,
  natuTooltipImports,
} from '../../../directives';
import { NatuSidebarService } from '../services/sidebar.service';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { NatuSidebarGroupPopoverService } from '../services/sidebar-group-popover.service';
import { provideToken } from '../../../utils';

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
  providers: [
    provideToken({
      provide: NATU_FOCUS_RING_DATA,
      useValue: { focusVisibleClass: signal('natu-sidebar__item--focus') },
    }),
    provideToken({
      provide: NATU_TOOLTIP_DATA,
      useFactory: () => {
        const component = inject(NatuSidebarItemComponent);

        return {
          placement: signal('right' as const),
          isDisabled: component.isTooltipDisabled,
        };
      },
    }),
  ],
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

  readonly isTooltipDisabled: Signal<boolean>;

  private readonly sidebarService = inject(NatuSidebarService);
  private readonly sidebarGroupPopoverService = inject(NatuSidebarGroupPopoverService, {
    optional: true,
  });

  constructor() {
    const isPopoverItem = Boolean(this.sidebarGroupPopoverService);

    this.isTooltipDisabled = computed(() => isPopoverItem || this.sidebarService.isExpanded());
  }
}
