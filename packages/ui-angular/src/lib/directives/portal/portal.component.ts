import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, inject } from '@angular/core';

@Component({
  selector: 'natu-portal',
  template: `<ng-template [ngComponentOutlet]="content" [ngComponentOutletInjector]="injector" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NgComponentOutlet],
})
export class NatuPortalComponent {
  @Input({ required: true }) content!: ComponentType<unknown>;

  readonly injector = inject(Injector);
}
