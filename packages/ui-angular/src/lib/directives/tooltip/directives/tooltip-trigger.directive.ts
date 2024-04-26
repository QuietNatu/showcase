import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { NatuTooltipService } from '../tooltip.service';

@Directive({
  selector: '[natuTooltipTrigger]',
  standalone: true,
  host: {
    '[attr.aria-describedby]':
      "tooltipService.isMounted$() ? 'tooltip-' + tooltipService.floatingId : null",
  },
})
export class NatuTooltipTriggerDirective implements OnInit {
  readonly tooltipService = inject(NatuTooltipService);

  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  ngOnInit(): void {
    this.tooltipService.setReferenceElement(this.elementRef);
  }
}
