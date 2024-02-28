import { Directive, inject } from '@angular/core';
import { NatuAccordionService } from './accordion.service';

/**
 * Contains the collapsible content of the accordion.
 */
@Directive({
  selector: '[natuAccordionContent]',
  standalone: true,
  host: {
    role: 'region',
    '[id]': "id + '-region'",
    '[hidden]': '!isExpanded()',
    '[attr.aria-labelledby]': "id + '-trigger'",
  },
})
export class NatuAccordionContentDirective {
  readonly id;
  readonly isExpanded;

  private readonly accordionService = inject(NatuAccordionService);

  constructor() {
    this.id = this.accordionService.id;
    this.isExpanded = this.accordionService.isExpanded$;
  }
}
