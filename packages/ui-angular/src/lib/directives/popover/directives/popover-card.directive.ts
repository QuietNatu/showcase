import { Directive, inject, signal } from '@angular/core';
import { NatuPopoverService } from '../popover.service';
import { NATU_CARD_DATA } from '../../../components';
import { provideToken } from '../../../utils';

@Directive({
  selector: 'natu-card[natuPopoverCard],[natu-card][natuPopoverCard]',
  standalone: true,
  providers: [
    provideToken({
      provide: NATU_CARD_DATA,
      useValue: {
        isEmbedded: signal(true),
        isDismissable: signal(true),
      },
    }),
  ],
  host: {
    '(dismiss)': 'handleDismiss()',
  },
})
export class NatuPopoverCardDirective {
  private readonly popoverService = inject(NatuPopoverService);

  handleDismiss() {
    this.popoverService.dismiss();
  }
}
