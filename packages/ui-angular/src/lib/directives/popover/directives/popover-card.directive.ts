import { Directive, inject } from '@angular/core';
import { NatuPopoverService } from '../popover.service';
import { NatuCardComponentConfigService } from '../../../components';

@Directive({
  selector: 'natu-card[natuPopoverCard],[natu-card][natuPopoverCard]',
  standalone: true,
  providers: [NatuCardComponentConfigService],
  host: {
    '(dismiss)': 'handleDismiss()',
  },
})
export class NatuPopoverCardDirective {
  private readonly popoverService = inject(NatuPopoverService);
  private readonly cardComponentConfigService = inject(NatuCardComponentConfigService);

  constructor() {
    // Cannot host bind to component inputs https://github.com/angular/angular/issues/13776
    this.cardComponentConfigService.isEmbedded.set(true);
    this.cardComponentConfigService.isDismissable.set(true);
  }

  handleDismiss() {
    this.popoverService.dismiss();
  }
}
