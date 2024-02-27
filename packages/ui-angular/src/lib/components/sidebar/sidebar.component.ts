import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { NatuSidebarHeaderComponent } from './components/sidebar-header.component';
import { NatuSidebarItemComponent } from './components/sidebar-item.component';
import { NatuSidebarBodyComponent } from './components/sidebar-body.component';
import { NatuSidebarFooterComponent } from './components/sidebar-footer.component';
import { NatuSidebarItemDirective } from './directives/sidebar-item.directive';
import { NatuSidebarItemLabelDirective } from './directives/sidebar-item-label.directive';
import { NatuSidebarItemIconDirective } from './directives/sidebar-item-icon.directive';
import { NatuSidebarGroupComponent } from './components/sidebar-group.component';
import { NatuSidebarService } from './sidebar.service';
import { registerEffect } from '../../utils/rxjs';
import { NatuSidebarGroupIconDirective } from './directives/sidebar-group-icon.directive';
import { NatuSidebarGroupLabelDirective } from './directives/sidebar-group-label.directive';

@Component({
  selector: 'natu-sidebar',
  template: `
    <ng-content />

    <button type="button" (click)="sidebarService.toggleExpansion()">Toggle expansion</button>
  `,
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [NatuSidebarService],
  host: {
    class: 'sidebar',
    '[class.sidebar--expanded]': 'isExpanded$()',
  },
})
export class NatuSidebarComponent {
  @Input({ transform: booleanAttribute }) set isExpanded(isExpanded: boolean) {
    this.sidebarService.setIsExpanded(isExpanded);
  }
  @Input({ transform: booleanAttribute }) set defaultIsExpanded(defaultIsExpanded: boolean) {
    this.sidebarService.setDefaultIsExpanded(defaultIsExpanded);
  }

  @Output() isExpandedChange = new EventEmitter<boolean>();

  readonly sidebarService = inject(NatuSidebarService);
  readonly isExpanded$ = this.sidebarService.isExpanded$;

  constructor() {
    registerEffect(this.sidebarService.isExpandedChange$, (isOpen) => {
      this.isExpandedChange.emit(isOpen);
    });
  }
}

export const natuSidebarImports = [
  NatuSidebarComponent,
  NatuSidebarHeaderComponent,
  NatuSidebarBodyComponent,
  NatuSidebarFooterComponent,
  NatuSidebarItemComponent,
  NatuSidebarGroupComponent,
  NatuSidebarItemDirective,
  NatuSidebarItemIconDirective,
  NatuSidebarItemLabelDirective,
  NatuSidebarGroupIconDirective,
  NatuSidebarGroupLabelDirective,
] as const;
