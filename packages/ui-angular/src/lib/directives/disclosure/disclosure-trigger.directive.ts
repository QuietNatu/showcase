import { Directive, inject } from '@angular/core';
import { NatuDisclosureService } from './disclosure.service';

/**
 * Toggles the expanded state of the disclosure.
 */
@Directive({
  selector: '[natuDisclosureTrigger]',
  standalone: true,
  host: {
    '[id]': "id + '-trigger'",
    '[attr.aria-expanded]': 'isDisabled() ? null : isExpanded()',
    '[attr.aria-controls]': "isDisabled() ? null : id + '-region'",
    '(click)': '!isDisabled() && toggleExpansion()',
  },
})
export class NatuDisclosureTriggerDirective {
  readonly id;
  readonly isExpanded;
  readonly isDisabled;

  private readonly disclosureService = inject(NatuDisclosureService);

  constructor() {
    this.id = this.disclosureService.id;
    this.isExpanded = this.disclosureService.isExpanded;
    this.isDisabled = this.disclosureService.isDisabled;
  }

  toggleExpansion() {
    this.disclosureService.toggleExpansion();
  }
}
