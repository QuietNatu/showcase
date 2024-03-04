import { trigger, style, animate, transition } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayService } from '../../overlay';
import { NatuOverlayArrowComponent } from '../../overlay/overlay-arrow.component';
import { Side } from '@floating-ui/dom';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuPopoverService } from './popover.service';

const animationDuration = NATU_TIME_ANIMATION_STANDARD;
const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

@Component({
  selector: 'natu-popover',
  template: `
    @if (isOpen$() && context$()) {
      <div
        class="natu-popover"
        [@openClose]="{ value: true, params: { transformation: transformation$() } }"
        (@openClose.done)="$event.toState === 'void' && handleFinishClose()"
      >
        @if (textContent$()) {
          {{ textContent$() }}
        } @else {
          <ng-template
            [ngTemplateOutlet]="templateContent$()"
            [ngTemplateOutletContext]="templateContext$()"
            [ngTemplateOutletInjector]="injector"
          />
        }

        <natu-overlay-arrow class="natu-popover__arrow" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, NatuOverlayArrowComponent],
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[id]': '"popover-" + floatingId',
    '[style]': 'floatingStyle$()',
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
export class NatuPopoverComponent implements OnInit, OnDestroy {
  readonly floatingId;
  readonly arrowWidth;
  readonly arrowHeight;

  readonly textContent$;
  readonly templateContent$;
  readonly templateContext$;
  readonly isOpen$;
  readonly context$;
  readonly floatingStyle$;
  readonly transformation$;

  readonly injector = inject(Injector);

  private readonly elementRef = inject(ElementRef);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.floatingId = this.overlayService.floatingId;
    this.arrowWidth = this.overlayService.arrowWidth;
    this.arrowHeight = this.overlayService.arrowHeight;

    this.textContent$ = this.popoverService.textContent$;
    this.templateContent$ = this.popoverService.templateContent$;
    this.templateContext$ = this.popoverService.templateContext$;

    this.isOpen$ = this.overlayService.isOpen$;
    this.context$ = this.overlayService.context$;
    this.floatingStyle$ = this.overlayService.floatingStyle$;

    this.transformation$ = computed(() => {
      const placement = this.overlayService.context$()?.placement;

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

  handleFinishClose() {
    this.overlayService.unmount();
  }
}
