import { trigger, style, animate, transition } from '@angular/animations';
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
import { Side } from '@floating-ui/dom';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';

const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

const animationDuration = NATU_TIME_ANIMATION_STANDARD;

@Component({
  selector: 'natu-tooltip',
  template: `
    @if (overlayData$()) {
      <div
        class="natu-tooltip"
        [@openClose]="{ value: true, params: { transformation: transformation$() } }"
      >
        @if (textContent$()) {
          {{ textContent$() }}
        } @else {
          <ng-template
            [ngTemplateOutlet]="templateContent$()"
            [ngTemplateOutletInjector]="injector"
          />
        }

        <natu-overlay-arrow class="natu-tooltip__arrow" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NatuOverlayArrowComponent],
  host: {
    '[style]': 'overlayData$()?.floatingStyle',
  },
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: '{{ transformation }}' }),
        animate(animationDuration, style({ opacity: 1, transform: 'translate(0, 0)' })),
      ]),
      transition(':leave', [
        animate(animationDuration, style({ opacity: 0, transform: '{{ transformation }}' })),
      ]),
    ]),
  ],
})
export class NatuTooltipComponent implements OnInit, OnDestroy {
  readonly arrowWidth;
  readonly arrowHeight;

  readonly textContent$;
  readonly templateContent$;
  readonly overlayData$;
  readonly transformation$;

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

    this.transformation$ = computed(() => {
      const placement = this.overlayData$()?.context.placement;

      if (!placement) {
        return null;
      }

      const [side] = placement.split('-') as [Side];

      return sideTransforms[side];
    });
  }

  ngOnInit(): void {
    this.overlayService.setFloatingElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.overlayService.setFloatingElement(null);
  }
}
