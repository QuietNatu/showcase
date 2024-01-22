import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  TemplateRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'natu-portal',
  template: ` <ng-template [ngTemplateOutlet]="content" [ngTemplateOutletInjector]="injector" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class NatuPortalComponent {
  @Input({ required: true }) content!: TemplateRef<unknown>;

  readonly injector = inject(Injector);
}
