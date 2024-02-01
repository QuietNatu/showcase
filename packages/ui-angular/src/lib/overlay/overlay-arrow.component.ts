import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { Side } from '@floating-ui/dom';
import { NatuOverlayService } from './overlay.service';

const rotation: Record<Side, string> = {
  top: '',
  left: 'rotate(-90deg)',
  bottom: 'rotate(180deg)',
  right: 'rotate(90deg)',
};

/**
 * Creates an overlay arrow, that gets automatically positioned.
 *
 * Based on https://github.com/floating-ui/floating-ui/blob/master/packages/react/src/components/FloatingArrow.tsx
 * to avoid reinventing the wheel.
 */
@Component({
  selector: 'natu-overlay-arrow',
  template: `
    <svg
      #arrow
      aria-hidden
      [attr.width]="width"
      [attr.height]="width"
      [attr.viewBox]="viewBox"
      [style]="style$()"
    >
      <path stroke="none" [attr.d]="dValue" />

      <clipPath>
        <rect x="0" y="0" [attr.width]="width" [attr.height]="width" />
      </clipPath>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuOverlayArrowComponent implements OnInit, OnDestroy {
  @ViewChild('arrow', { static: true }) arrowRef!: ElementRef<HTMLElement>;

  readonly width;
  readonly height;
  readonly viewBox;
  readonly dValue;

  readonly style$;

  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.width = this.overlayService.arrowWidth;
    this.height = this.overlayService.arrowHeight;
    this.viewBox = this.getViewBox();
    this.dValue = this.getDValue();
    this.style$ = this.getStyle();
  }

  ngOnInit(): void {
    this.overlayService.setArrowElement(this.arrowRef);
  }

  ngOnDestroy(): void {
    this.overlayService.setArrowElement(null);
  }

  private getViewBox() {
    const width = this.width;
    const height = this.height;

    return `0 0 ${width} ${height > width ? height : width}`;
  }

  private getDValue() {
    const width = this.width;
    const height = this.height;
    const svgX = width / 2;
    const svgY = 0;

    return `M0,0 H${width} L${width - svgX},${height - svgY} Q${width / 2},${height} ${svgX},${height - svgY} Z`;
  }

  private getStyle() {
    return computed<Partial<CSSStyleDeclaration>>(() => {
      const context = this.overlayService.context$();

      if (!context) {
        return {};
      }

      const [side] = context.placement.split('-') as [Side];
      const { arrow } = context.middlewareData;
      const arrowX = typeof arrow?.x === 'number' ? `${Math.round(arrow.x)}px` : undefined;
      const arrowY = typeof arrow?.y === 'number' ? `${Math.round(arrow.y)}px` : undefined;

      return {
        position: 'absolute',
        pointerEvents: 'none',
        left: arrowX,
        top: arrowY,
        [side]: '100%',
        transform: rotation[side],
      };
    });
  }
}
