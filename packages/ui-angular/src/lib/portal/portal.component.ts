import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  computed,
  inject,
} from '@angular/core';
import { NatuPortalService } from './portal.service';

/* TODO: test for component outlet */

@Component({
  selector: 'natu-portal',
  template: `
    @if (templateContent$()) {
      <ng-template [ngTemplateOutlet]="templateContent$()" [ngTemplateOutletInjector]="injector" />
    } @else {
      <ng-template
        [ngComponentOutlet]="componentContent$()"
        [ngComponentOutletInjector]="injector"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NgComponentOutlet],
})
export class NatuPortalComponent {
  readonly templateContent$;
  readonly componentContent$;
  readonly injector = inject(Injector);

  private readonly portalService = inject(NatuPortalService);

  constructor() {
    this.templateContent$ = computed(() => {
      const content = this.portalService.content$();
      return content instanceof TemplateRef ? content : null;
    });

    this.componentContent$ = computed(() => {
      const content = this.portalService.content$();
      return !(content instanceof TemplateRef) ? content : null;
    });
  }
}
