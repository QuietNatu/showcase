import { Directive, inject } from '@angular/core';
import { NatuDisclosureService } from './disclosure.service';

/**
 * Contains the collapsible content of the disclosure.
 */
@Directive({
  selector: '[natuDisclosureContent]',
  standalone: true,
  host: {
    role: 'region',
    '[id]': "id + '-region'",
    '[hidden]': '!isExpanded()',
    '[attr.aria-labelledby]': "id + '-trigger'",
  },
})
export class NatuDisclosureContentDirective {
  readonly id;
  readonly isExpanded;

  private readonly disclosureService = inject(NatuDisclosureService);

  constructor() {
    this.id = this.disclosureService.id;
    this.isExpanded = this.disclosureService.isExpanded;
  }
}
