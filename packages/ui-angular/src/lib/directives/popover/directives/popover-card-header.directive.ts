import { Directive, inject } from '@angular/core';
import { NatuCardHeaderComponent } from '../../../components';
import { NatuPopoverService } from '../popover.service';

@Directive({
  selector: 'natu-card-header[natuPopoverCardHeader],[natu-card-header][natuPopoverCardHeader]',
  standalone: true,
  host: {
    '[id]': 'id',
  },
})
export class NatuPopoverCardHeaderDirective {
  readonly id;

  readonly popoverService = inject(NatuPopoverService);
  private readonly cardHeaderComponent = inject(NatuCardHeaderComponent, { host: true });

  constructor() {
    this.id = `popover-card-header-${this.popoverService.floatingId}`;

    this.popoverService.setLabelId(this.id);

    this.cardHeaderComponent.size = 'small';
  }
}
