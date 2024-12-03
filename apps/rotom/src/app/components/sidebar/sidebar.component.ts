import { ChangeDetectionStrategy, Component } from '@angular/core';
import { natuSidebarImports } from '@natu/ui-angular';

/**
 * Displays the sidebar of the app.
 */
@Component({
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [natuSidebarImports],
  template: `<natu-sidebar class="sidebar"></natu-sidebar>`,
})
export class SidebarComponent {}
