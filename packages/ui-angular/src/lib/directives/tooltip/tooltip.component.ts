import { trigger, style, animate, transition } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayDelayGroupService, NatuOverlayService } from '../../overlay';
import { NatuOverlayArrowComponent } from '../../overlay/overlay-arrow.component';
import { Side } from '@floating-ui/dom';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuTooltipService } from './tooltip.service';

const animationDuration = NATU_TIME_ANIMATION_STANDARD;
const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

@Component({
  selector: 'natu-tooltip',
  template: `
    @if (isOpen() && context()) {
      <div
        class="natu-tooltip"
        [@openClose]="{
          value: true,
          params: {
            transformation: transformation(),
            openDuration: animationDuration().open + 'ms',
            closeDuration: animationDuration().close + 'ms',
          },
        }"
        (@openClose.done)="$event.toState === 'void' && handleFinishClose()"
      >
        <div>
          <ng-template [ngTemplateOutlet]="content()" [ngTemplateOutletInjector]="injector" />
        </div>

        <natu-overlay-arrow class="natu-tooltip__arrow" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NatuOverlayArrowComponent],
  host: {
    role: 'tooltip',
    tabindex: '-1',
    '[id]': '"tooltip-" + floatingId',
    '[style]': 'floatingStyle()',
  },
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: '{{ transformation }}' }),
        animate('{{ openDuration }}', style({ opacity: 1, transform: 'translate(0, 0)' })),
      ]),
      transition(':leave', [
        animate('{{ closeDuration }}', style({ opacity: 0, transform: '{{ transformation }}' })),
      ]),
    ]),
  ],
})
export class NatuTooltipComponent implements OnInit, OnDestroy {
  readonly floatingId;
  readonly arrowWidth;
  readonly arrowHeight;

  readonly content;
  readonly isOpen;
  readonly context;
  readonly floatingStyle;
  readonly transformation;

  readonly animationDuration: Signal<{ open: number; close: number }>;

  readonly injector = inject(Injector);

  private readonly elementRef = inject(ElementRef);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly tooltipService = inject(NatuTooltipService);
  private readonly overlayDelayGroupService = inject(NatuOverlayDelayGroupService, {
    optional: true,
  });

  constructor() {
    this.floatingId = this.overlayService.floatingId;
    this.arrowWidth = this.overlayService.arrowWidth;
    this.arrowHeight = this.overlayService.arrowHeight;

    this.content = this.tooltipService.content;

    this.isOpen = this.overlayService.isOpen;
    this.context = this.overlayService.context;
    this.floatingStyle = this.overlayService.floatingStyle;

    this.transformation = computed(() => {
      const placement = this.overlayService.context()?.placement;

      if (!placement) {
        return null;
      }

      const [side] = placement.split('-') as [Side];

      return sideTransforms[side];
    });

    this.animationDuration = computed(() => {
      if (this.overlayDelayGroupService?.isInstantPhase()) {
        const isCurrentId = this.overlayDelayGroupService.currentId() === this.floatingId;
        return { open: 0, close: isCurrentId ? animationDuration : 0 };
      } else {
        return { open: animationDuration, close: animationDuration };
      }
    });
  }

  ngOnInit(): void {
    this.overlayService.setFloatingElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.overlayService.setFloatingElement(null);
  }

  handleFinishClose() {
    this.overlayService.unmount();
  }
}
