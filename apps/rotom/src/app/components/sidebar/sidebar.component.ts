import { ChangeDetectionStrategy, Component } from '@angular/core';
import { natuSidebarImports } from '@natu/ui-angular';

@Component({
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuSidebarImports],
  template: `<natu-sidebar class="sidebar"></natu-sidebar>`,
})
export class SidebarComponent {}
