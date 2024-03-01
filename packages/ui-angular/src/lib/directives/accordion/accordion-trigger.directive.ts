import { Directive, inject } from '@angular/core';
import { NatuAccordionService } from './accordion.service';

/* TODO: remove isdisabled? */

/**
 * Toggles the expanded state of the accordion.
 */
@Directive({
  selector: '[natuAccordionTrigger]',
  standalone: true,
  host: {
    '[id]': "id + '-trigger'",
    '[attr.aria-expanded]': 'isDisabled() ? null : isExpanded()',
    '[attr.aria-controls]': "isDisabled() ? null : id + '-region'",
    '(click)': '!isDisabled() && toggleExpansion()',
  },
})
export class NatuAccordionTriggerDirective {
  readonly id;
  readonly isExpanded;
  readonly isDisabled;

  private readonly accordionService = inject(NatuAccordionService);

  constructor() {
    this.id = this.accordionService.id;
    this.isExpanded = this.accordionService.isExpanded$;
    this.isDisabled = this.accordionService.isDisabled$;
  }

  toggleExpansion() {
    this.accordionService.toggleExpansion();
  }
}
