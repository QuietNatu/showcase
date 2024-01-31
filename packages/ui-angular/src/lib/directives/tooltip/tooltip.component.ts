import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  computed,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayService } from '../../overlay';
import { NatuOverlayArrowComponent } from '../../overlay/overlay-arrow.component';

@Component({
  selector: 'natu-tooltip',
  template: `
    <div class="natu-tooltip">
      @if (textContent$()) {
        {{ textContent$() }}
      } @else {
        <ng-template
          [ngTemplateOutlet]="templateContent$()"
          [ngTemplateOutletInjector]="injector"
        />
      }
    </div>

    <natu-overlay-arrow class="natu-tooltip__arrow" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NatuOverlayArrowComponent],
  host: {
    '[style]': 'overlayData$()?.floatingStyle',
  },
})
export class NatuTooltipComponent implements OnInit, OnDestroy {
  readonly arrowWidth;
  readonly arrowHeight;

  readonly textContent$;
  readonly templateContent$;
  readonly overlayData$;

  readonly injector = inject(Injector);

  private readonly elementRef = inject(ElementRef);
  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.arrowWidth = this.overlayService.arrowWidth;
    this.arrowHeight = this.overlayService.arrowHeight;

    this.textContent$ = computed(() => {
      const content = this.overlayService.content$();
      return typeof content === 'string' ? content : null;
    });

    this.templateContent$ = computed(() => {
      const content = this.overlayService.content$();
      return content instanceof TemplateRef ? content : null;
    });

    this.overlayData$ = this.overlayService.overlayData$;
  }

  ngOnInit(): void {
    this.overlayService.setFloatingElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.overlayService.setFloatingElement(null);
  }
}
