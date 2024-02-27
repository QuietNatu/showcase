import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLinkActive } from '@angular/router';

/* TODO: document that sidebar already supports router links */
@Component({
  selector: 'natu-sidebar-item,[natu-sidebar-item]',
  template: `
    <ng-content select="[natuSidebarItemIcon]" />
    <ng-content select="[natuSidebarItemLabel]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'sidebar__item',
    '[class.sidebar__item--active]': 'isActive$()',
  },
})
export class NatuSidebarItemComponent {
  @Input() set isActive(isActive: boolean | null | undefined) {
    this.controlledIsActive$.set(isActive ?? null);
  }

  readonly isActive$;

  private readonly controlledIsActive$ = signal<boolean | null>(null);
  private readonly routerLinkActive = inject(RouterLinkActive, { optional: true, self: true });

  constructor() {
    this.isActive$ = this.getIsActive();
  }

  private getIsActive(): Signal<boolean> {
    const routerIsActive$ = this.routerLinkActive
      ? toSignal(this.routerLinkActive.isActiveChange, {
          initialValue: this.routerLinkActive.isActive,
        })
      : null;

    return computed(() => this.controlledIsActive$() ?? routerIsActive$?.() ?? false);
  }
}
