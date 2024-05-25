import { Directive, inject } from '@angular/core';
import { NatuCardHeaderComponentConfigService } from '../../../components';
import { NatuPopoverService } from '../popover.service';

@Directive({
  selector: 'natu-card-header[natuPopoverCardHeader],[natu-card-header][natuPopoverCardHeader]',
  standalone: true,
  providers: [NatuCardHeaderComponentConfigService],
  host: {
    '[id]': 'id',
  },
})
export class NatuPopoverCardHeaderDirective {
  readonly id;

  readonly popoverService = inject(NatuPopoverService);
  private readonly cardHeaderComponentConfigService = inject(NatuCardHeaderComponentConfigService);

  constructor() {
    this.id = `popover-card-header-${this.popoverService.floatingId}`;
    this.popoverService.setLabelId(this.id);
    this.cardHeaderComponentConfigService.size.set('small');
  }
}
