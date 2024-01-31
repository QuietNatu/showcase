import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayService } from '../../overlay';

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

    <span #arrow class="natu-tooltip__arrow">Arrow</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    '[style]': 'overlayData$()?.style',
  },
})
export class NatuTooltipComponent implements OnInit, OnDestroy {
  @ViewChild('arrow', { static: true }) arrowRef!: ElementRef<HTMLElement>;

  readonly textContent$;
  readonly templateContent$;
  readonly overlayData$;

  readonly injector = inject(Injector);

  private readonly elementRef = inject(ElementRef);
  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
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
    this.overlayService.initializeOverlay(this.elementRef, this.arrowRef);
  }

  ngOnDestroy(): void {
    this.overlayService.destroyOverlay();
  }
}
