import { Directive, inject, input } from '@angular/core';
import { NatuOverlayDelayGroupService } from './overlay-delay-group.service';
import { NatuOverlayDelayInput } from './overlay-types';
import { registerSignal } from '../utils';

/**
 * Provides data to a group of overlays that share a delay when opening or closing.

 * After the first overlay opens, the subsequent overlays will open without a delay.
 */
@Directive({
  selector: '[natuOverlayDelayGroup]',
  standalone: true,
  providers: [NatuOverlayDelayGroupService],
})
export class NatuOverlayDelayGroupDirective {
  /** The delays that should be used by all the overlays in the group. */
  readonly delay = input<NatuOverlayDelayInput>(null, { alias: 'natuOverlayDelayGroupDelay' });

  private readonly overlayDelayGroupService = inject(NatuOverlayDelayGroupService);

  constructor() {
    registerSignal(this.delay, (delay) => {
      this.overlayDelayGroupService.setDelay(delay);
    });
  }
}
