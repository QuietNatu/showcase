import { Directive, inject, input } from '@angular/core';
import { NatuOverlayDelayGroupService } from './overlay-delay-group.service';
import { NatuOverlayDelayInput } from './overlay-types';
import { connectSignal } from '../utils';

/* TODO: docs */
@Directive({
  selector: '[natuOverlayDelayGroup]',
  standalone: true,
  providers: [NatuOverlayDelayGroupService],
})
export class NatuOverlayDelayGroupDirective {
  readonly delay = input<NatuOverlayDelayInput>(null, { alias: 'natuOverlayDelayGroupDelay' });

  private readonly overlayDelayGroupService = inject(NatuOverlayDelayGroupService);

  constructor() {
    /* TODO: disable delay in tests. */

    connectSignal(this.delay, (delay) => {
      this.overlayDelayGroupService.setDelay(delay);
    });
  }
}
