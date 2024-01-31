import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  TemplateRef,
  computed,
  inject,
  signal,
} from '@angular/core';

/* TODO: test and stories for component outlet */

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
  @Input({ required: true }) set content(content: TemplateRef<unknown> | ComponentType<unknown>) {
    this.content$.set(content);
  }

  readonly templateContent$;
  readonly componentContent$;
  readonly injector = inject(Injector);

  private readonly content$ = signal<TemplateRef<unknown> | ComponentType<unknown> | null>(null);

  constructor() {
    this.templateContent$ = computed(() => {
      const content = this.content$();
      return content instanceof TemplateRef ? content : null;
    });

    this.componentContent$ = computed(() => {
      const content = this.content$();
      return !(content instanceof TemplateRef) ? content : null;
    });
  }
}
