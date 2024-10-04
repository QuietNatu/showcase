import { Directive, OnInit, TemplateRef, inject } from '@angular/core';
import { NatuTooltipService } from '../tooltip.service';

/**
 * The content of the component that pops out when the tooltip is open.
 */
@Directive({
  selector: '[natuTooltipContent]',
  standalone: true,
})
export class NatuTooltipContentDirective implements OnInit {
  private readonly tooltipService = inject(NatuTooltipService);
  private readonly templateRef = inject(TemplateRef);

  ngOnInit(): void {
    this.tooltipService.setContent(this.templateRef);
  }
}
