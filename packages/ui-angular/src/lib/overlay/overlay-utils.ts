import { NatuDelay, NatuDelayInput } from './overlay-types';

export function normalizeOverlayDelay(delay: NatuDelayInput): NatuDelay {
  if (delay === null || delay == undefined) {
    return { open: 0, close: 0 };
  } else if (typeof delay === 'number') {
    return { open: delay, close: delay };
  } else {
    return { open: delay.open ?? 0, close: delay.close ?? 0 };
  }
}
