import { Directive, OnInit, TemplateRef, inject } from '@angular/core';
import { NatuPopoverService } from '../popover.service';

/**
 * The content of the component that pops out when the popover is open.
 */
@Directive({
  selector: '[natuPopoverContent]',
  standalone: true,
})
export class NatuPopoverContentDirective implements OnInit {
  private readonly popoverService = inject(NatuPopoverService);
  private readonly templateRef = inject(TemplateRef);

  ngOnInit(): void {
    this.popoverService.setContent(this.templateRef);
  }
}
