import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Signal,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLinkActive } from '@angular/router';
import { NatuTooltipDirective } from '../../../directives';
import { NatuSidebarService } from '../sidebar.service';
import { NgTemplateOutlet } from '@angular/common';
import { NatuSidebarLabelDirective } from '../directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from '../directives/sidebar-icon.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { map } from 'rxjs';

/* TODO: document that sidebar already supports router links */
@Component({
  selector: 'natu-sidebar-item,[natu-sidebar-item]',
  template: `
    @if (iconTemplate(); as iconTemplate) {
      <span class="sidebar__item-icon">
        <ng-template [ngTemplateOutlet]="iconTemplate" />
      </span>
    }

    @if (labelTemplate(); as labelTemplate) {
      <span class="sidebar__item-label">
        <ng-template [ngTemplateOutlet]="labelTemplate" />
      </span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    tabindex: '0',
    class: 'sidebar__item',
    '[class.sidebar__item--active]': 'isActive$()',
    '[class.sidebar__item--focus]': 'isFocusVisible$()',
  },
  hostDirectives: [{ directive: NatuTooltipDirective }],
})
export class NatuSidebarItemComponent {
  @Input() set isActive(isActive: boolean | null | undefined) {
    this.controlledIsActive$.set(isActive ?? null);
  }

  readonly isActive$;
  readonly isFocusVisible$;
  readonly iconTemplate = contentChild(NatuSidebarIconDirective, { read: TemplateRef });
  readonly labelTemplate = contentChild(NatuSidebarLabelDirective, { read: TemplateRef });

  private readonly controlledIsActive$ = signal<boolean | null>(null);
  private readonly sidebarService = inject(NatuSidebarService);
  private readonly tooltipDirective = inject(NatuTooltipDirective, { self: true });
  private readonly routerLinkActive = inject(RouterLinkActive, { optional: true, self: true });
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly focusMonitor = inject(FocusMonitor); // Change this once CDK directives are standalone...

  constructor() {
    this.isActive$ = this.getIsActive();
    this.isFocusVisible$ = this.getIsFocusVisible();

    this.registerSyncTooltip();
  }

  private getIsActive(): Signal<boolean> {
    const routerIsActive$ = this.routerLinkActive
      ? toSignal(this.routerLinkActive.isActiveChange, {
          initialValue: this.routerLinkActive.isActive,
        })
      : null;

    return computed(() => this.controlledIsActive$() ?? routerIsActive$?.() ?? false);
  }

  private getIsFocusVisible() {
    const isFocusVisible$ = this.focusMonitor
      .monitor(this.elementRef.nativeElement)
      .pipe(map((origin) => origin === 'keyboard'));

    return toSignal(isFocusVisible$, { initialValue: false });
  }

  private registerSyncTooltip() {
    effect(() => {
      const labelTemplate = this.labelTemplate();
      const isExpanded = this.sidebarService.isExpanded$();

      untracked(() => {
        this.tooltipDirective.placement = 'right';
        this.tooltipDirective.content = labelTemplate;
        this.tooltipDirective.isDisabled = isExpanded;
      });
    });
  }
}
