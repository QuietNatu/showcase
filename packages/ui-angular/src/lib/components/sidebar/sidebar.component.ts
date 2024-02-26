import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NatuSidebarHeaderComponent } from './components/sidebar-header.component';
import { NatuSidebarItemComponent } from './components/sidebar-item.component';
import { NatuSidebarBodyComponent } from './components/sidebar-body.component';
import { NatuSidebarFooterComponent } from './components/sidebar-footer.component';
import { NatuSidebarItemDirective } from './directives/sidebar-item.directive';
import { NatuSidebarItemLabelDirective } from './directives/sidebar-item-label.directive';
import { NatuSidebarItemIconDirective } from './directives/sidebar-item-icon.directive';

@Component({
  selector: 'natu-sidebar',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuSidebarComponent {}

export const natuSidebarImports = [
  NatuSidebarComponent,
  NatuSidebarHeaderComponent,
  NatuSidebarBodyComponent,
  NatuSidebarFooterComponent,
  NatuSidebarItemComponent,
  NatuSidebarItemDirective,
  NatuSidebarItemIconDirective,
  NatuSidebarItemLabelDirective,
] as const;
