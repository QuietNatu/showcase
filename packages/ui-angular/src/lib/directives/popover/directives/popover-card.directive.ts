import { Directive, inject } from '@angular/core';
import { NatuPopoverService } from '../popover.service';
import { NatuCardComponent } from '../../../components';

@Directive({
  selector: 'natu-card[natuPopoverCard],[natu-card][natuPopoverCard]',
  standalone: true,
  host: {
    '(dismiss)': 'handleDismiss()',
  },
})
export class NatuPopoverCardDirective {
  private readonly popoverService = inject(NatuPopoverService);
  private readonly cardComponent = inject(NatuCardComponent, { host: true });

  constructor() {
    // Cannot host bind to component inputs https://github.com/angular/angular/issues/13776
    this.cardComponent.isEmbedded = true;
    this.cardComponent.isDismissable = true;
  }

  handleDismiss() {
    this.popoverService.dismiss();
  }
}
