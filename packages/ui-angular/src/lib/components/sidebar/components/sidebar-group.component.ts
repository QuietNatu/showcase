import { ChangeDetectionStrategy, Component, contentChildren, inject, signal } from '@angular/core';
import { NatuSidebarItemDirective } from '../directives/sidebar-item.directive';
import { NatuSidebarItemListComponent } from './sidebar-item-list.component';
import { NatuSidebarItemComponent } from './sidebar-item.component';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { NatuSidebarService } from '../sidebar.service';
import { caretDownIcon } from '@natu/assets/svg/caret-down';
import { caretUpIcon } from '@natu/assets/svg/caret-up';

/* TODO: accordion a11y */

@Component({
  selector: 'natu-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuSidebarItemListComponent, NatuSidebarItemComponent, SvgIconComponent],
})
export class NatuSidebarGroupComponent {
  readonly items = contentChildren(NatuSidebarItemDirective);
  readonly isExpanded;
  readonly isGroupExpanded = signal(false);

  private readonly sidebarService = inject(NatuSidebarService);

  constructor() {
    this.isExpanded = this.sidebarService.isExpanded$;

    injectRegisterIcons([caretDownIcon, caretUpIcon]);
  }

  handleToggleGroup() {
    this.isGroupExpanded.update((isExpanded) => !isExpanded);
  }
}
