import { Directive, inject } from '@angular/core';
import { NatuPopoverService } from '../popover.service';

/**
 * Integrates a card body into a popover.
 */
@Directive({
  selector: 'natu-card-body[natuPopoverCardBody],[natu-card-body][natuPopoverCardBody]',
  standalone: true,
  host: {
    '[id]': 'id',
  },
})
export class NatuPopoverCardBodyDirective {
  readonly id;

  private readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.id = `popover-card-body-${this.popoverService.floatingId}`;

    this.popoverService.setDescriptionId(this.id);
  }
}
