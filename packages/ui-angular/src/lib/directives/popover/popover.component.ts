import { trigger, style, animate, transition } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  Signal,
  TemplateRef,
  computed,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayService } from '../../overlay';
import { NatuOverlayArrowComponent } from '../../overlay';
import { ComputePositionReturn, Side } from '@floating-ui/dom';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuPopoverService } from './popover.service';
import { natuCardImports } from '../../components';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { registerEffect } from '../../utils';

const animationDuration = NATU_TIME_ANIMATION_STANDARD;
const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

/**
 * The content of the component that pops out when the popover is open.
 */
@Component({
  selector: 'natu-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NatuOverlayArrowComponent, natuCardImports, CdkTrapFocus],
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[id]': '"popover-" + floatingId',
    '[style]': 'floatingStyle()',
    '[attr.aria-labelledby]': 'labelId()',
    '[attr.aria-describedby]': 'descriptionId()',
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
  readonly floatingId: string;
  readonly arrowWidth: number;
  readonly arrowHeight: number;

  readonly labelId: Signal<string | null>;
  readonly descriptionId: Signal<string | null>;
  readonly hasEmbeddedContent: Signal<boolean>;
  readonly content: Signal<TemplateRef<unknown> | null>;
  readonly isOpen: Signal<boolean>;
  readonly context: Signal<ComputePositionReturn | null>;
  readonly floatingStyle: Signal<Partial<CSSStyleDeclaration> | null>;
  readonly transformation: Signal<string | null>;

  readonly injector = inject(Injector);

  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.floatingId = this.overlayService.floatingId;
    this.arrowWidth = this.overlayService.arrowWidth;
    this.arrowHeight = this.overlayService.arrowHeight;

    this.labelId = this.popoverService.labelId;
    this.descriptionId = this.popoverService.descriptionId;
    this.hasEmbeddedContent = this.popoverService.hasEmbeddedContent;
    this.content = this.popoverService.content;
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

    this.registerSpreadExtraAttributes();
  }

  ngOnInit(): void {
    this.overlayService.setFloatingElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.overlayService.setFloatingElement(null);
  }

  protected handleFinishClose() {
    this.overlayService.unmount();
  }

  private registerSpreadExtraAttributes() {
    // Could be improved if this feature is added someday https://github.com/angular/angular/issues/14545
    registerEffect(this.popoverService.attributes, (attributes) => {
      Object.entries(attributes).forEach(([name, value]) => {
        this.renderer.setAttribute(this.elementRef.nativeElement, name, value);
      });
    });
  }
}
