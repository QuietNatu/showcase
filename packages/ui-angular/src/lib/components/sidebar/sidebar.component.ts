import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NatuSidebarHeaderComponent } from './components/sidebar-header.component';
import { NatuSidebarItemComponent } from './components/sidebar-item.component';
import { NatuSidebarActionsComponent } from './components/sidebar-actions.component';
import { NatuSidebarSecondaryActionsComponent } from './components/sidebar-secondary-actions.component';
import { NatuSidebarItemDirective } from './directives/sidebar-item.directive';
import { NatuSidebarLabelDirective } from './directives/sidebar-label.directive';
import { NatuSidebarIconDirective } from './directives/sidebar-icon.directive';
import { NatuSidebarGroupComponent } from './components/sidebar-group.component';
import { NatuSidebarService } from './services/sidebar.service';
import { SvgIconComponent, injectRegisterIcons } from '@ngneat/svg-icon';
import { caretDownIcon } from '@natu/assets/svg/caret-down';
import { caretRightIcon } from '@natu/assets/svg/caret-right';
import { dotsThreeVerticalIcon } from '@natu/assets/svg/dots-three-vertical';
import { registerEffect } from '../../utils';
import { NatuTranslationDirective } from '../../i18n';
import { NatuOverlayDelayGroupDirective } from '../../overlay';

/**
 * Displays a sidebar with navigation and actions.
 *
 * Contains all the parts of a sidebar.
 */
@Component({
  selector: 'natu-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent, NatuTranslationDirective],
  providers: [NatuSidebarService],
  hostDirectives: [NatuOverlayDelayGroupDirective],
  host: {
    class: 'natu-sidebar',
    '[class.natu-sidebar--expanded]': 'isSidebarExpanded()',
    '[class.natu-sidebar--collapsed]': '!isSidebarExpanded()',
  },
})
export class NatuSidebarComponent {
  readonly isExpanded = input<boolean | null | undefined>(undefined);
  readonly defaultIsExpanded = input<boolean | null | undefined>(undefined);

  readonly sidebarService = inject(NatuSidebarService);

  readonly isExpandedChange = outputFromObservable(this.sidebarService.isExpandedChange$);

  readonly isSidebarExpanded = this.sidebarService.isExpanded;

  constructor() {
    injectRegisterIcons([caretDownIcon, caretRightIcon, dotsThreeVerticalIcon]);

    registerEffect(this.isExpanded, (isExpanded) => {
      this.sidebarService.setIsExpanded(isExpanded ?? undefined);
    });

    registerEffect(this.defaultIsExpanded, (defaultIsExpanded) => {
      this.sidebarService.setDefaultIsExpanded(defaultIsExpanded ?? undefined);
    });
  }
}

export const natuSidebarImports = [
  NatuSidebarComponent,
  NatuSidebarHeaderComponent,
  NatuSidebarActionsComponent,
  NatuSidebarSecondaryActionsComponent,
  NatuSidebarItemComponent,
  NatuSidebarGroupComponent,
  NatuSidebarItemDirective,
  NatuSidebarIconDirective,
  NatuSidebarLabelDirective,
] as const;
