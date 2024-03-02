import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { NatuSidebarHeaderComponent } from './components/sidebar-header.component';
import { NatuSidebarItemComponent } from './components/sidebar-item.component';
import { NatuSidebarActionsComponent } from './components/sidebar-actions.component';
import { NatuSidebarFooterActionsComponent } from './components/sidebar-footer-actions.component';
import { NatuSidebarItemDirective } from './directives/sidebar-item.directive';
import { NatuSidebarLabelDirective } from './directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from './directives/sidebar-icon.directive';
import { NatuSidebarGroupComponent } from './components/sidebar-group.component';
import { NatuSidebarService } from './sidebar.service';
import { registerEffect } from '../../utils/rxjs';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { caretRightIcon } from '@natu/assets/svg/caret-right';

/* TODO: check i18n */
/* TODO: group dropdown */

@Component({
  selector: 'natu-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SvgIconComponent],
  providers: [NatuSidebarService],
  host: {
    class: 'sidebar',
    '[class.sidebar--expanded]': 'isExpanded$()',
    '[class.sidebar--collapsed]': '!isExpanded$()',
  },
})
export class NatuSidebarComponent {
  @Input() set isExpanded(isExpanded: boolean | null | undefined) {
    this.sidebarService.setIsExpanded(isExpanded ?? undefined);
  }
  @Input() set defaultIsExpanded(defaultIsExpanded: boolean | null | undefined) {
    this.sidebarService.setDefaultIsExpanded(defaultIsExpanded ?? undefined);
  }

  @Output() isExpandedChange = new EventEmitter<boolean>();

  readonly sidebarService = inject(NatuSidebarService);
  readonly isExpanded$ = this.sidebarService.isExpanded$;

  constructor() {
    injectRegisterIcons([caretRightIcon]);

    registerEffect(this.sidebarService.isExpandedChange$, (isOpen) => {
      this.isExpandedChange.emit(isOpen);
    });
  }
}

export const natuSidebarImports = [
  NatuSidebarComponent,
  NatuSidebarHeaderComponent,
  NatuSidebarActionsComponent,
  NatuSidebarFooterActionsComponent,
  NatuSidebarItemComponent,
  NatuSidebarGroupComponent,
  NatuSidebarItemDirective,
  NatuSidebarIconDirective,
  NatuSidebarLabelDirective,
] as const;
