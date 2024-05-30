import { Directive, inject, signal } from '@angular/core';
import { NATU_CARD_HEADER_DATA } from '../../../components';
import { NatuPopoverService } from '../popover.service';
import { provideToken } from '../../../utils';

@Directive({
  selector: 'natu-card-header[natuPopoverCardHeader],[natu-card-header][natuPopoverCardHeader]',
  standalone: true,
  providers: [
    provideToken({ provide: NATU_CARD_HEADER_DATA, useValue: { size: signal('small' as const) } }),
  ],
  host: {
    '[id]': 'id',
  },
})
export class NatuPopoverCardHeaderDirective {
  readonly id;

  readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.id = `popover-card-header-${this.popoverService.floatingId}`;
    this.popoverService.setLabelId(this.id);
  }
}
