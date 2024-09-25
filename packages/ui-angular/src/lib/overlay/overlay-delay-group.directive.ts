import { Directive, effect, inject, input, untracked } from '@angular/core';
import { NatuOverlayDelayGroupService } from './overlay-delay-group.service';
import { NatuDelayInput } from './overlay-types';

/* TODO: docs */
@Directive({
  selector: '[natuOverlayDelayGroup]',
  standalone: true,
  providers: [NatuOverlayDelayGroupService],
})
export class NatuOverlayDelayGroupDirective {
  /* TODO: remove input and use tooltips */
  readonly delay = input<NatuDelayInput>(undefined, {
    alias: 'natuOverlayDelayGroupDelay',
  });

  private readonly overlayDelayGroupService = inject(NatuOverlayDelayGroupService);

  constructor() {
    /* TODO: disable delay in tests. */

    effect(() => {
      // TODO: https://github.com/angular/angular/issues/42649
      const delay = this.delay();
      // eslint-disable-next-line no-console
      console.log({ delay });

      untracked(() => {
        // TODO:
        // this.overlayDelayGroupService.setDelay(delay);
        this.overlayDelayGroupService.setDelay(500);
      });
    });
  }
}
