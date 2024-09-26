import { NatuOverlayDelay, NatuOverlayDelayInput } from './overlay-types';

export function normalizeOverlayDelay(delay: NatuOverlayDelayInput): NatuOverlayDelay {
  if (delay === null || delay === undefined) {
    return { open: null, close: null };
  } else if (typeof delay === 'number') {
    return { open: delay, close: delay };
  } else {
    return { open: delay.open ?? null, close: delay.close ?? null };
  }
}
