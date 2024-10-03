import { NatuOverlayDelay, NatuOverlayDelayInput } from './overlay-types';

/**
 * Transforms a given delay to a common format.
 */
export function normalizeOverlayDelay(delay: NatuOverlayDelayInput): NatuOverlayDelay {
  if (delay === null || delay === undefined) {
    return { open: null, close: null };
  } else if (typeof delay === 'number') {
    return { open: delay, close: delay };
  } else {
    return { open: delay.open ?? null, close: delay.close ?? null };
  }
}
