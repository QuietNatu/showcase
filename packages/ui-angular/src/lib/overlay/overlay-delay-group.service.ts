import { computed, Injectable, Signal, signal } from '@angular/core';
import { NatuOverlayDelay, NatuOverlayDelayInput } from './overlay-types';
import { normalizeOverlayDelay } from './overlay-utils';

interface State {
  delay: NatuOverlayDelay;
  initialDelay: NatuOverlayDelay;
  currentId: string | null;
  isInstantPhase: boolean;
}

/**
 * Manages a group of overlays that share a delay when opening or closing.

 * After the first overlay opens, the subsequent overlays will open without a delay.
 */
@Injectable()
export class NatuOverlayDelayGroupService {
  /** The id of the currently active overlay of the group. */
  readonly currentId: Signal<string | null>;
  /** The delays for opening and closing an overlay. */
  readonly delay: Signal<NatuOverlayDelay>;
  /** Phase where there is no delay when closing or opening overlays (when switching overlays). */
  readonly isInstantPhase: Signal<boolean>;

  private readonly state = signal<State>({
    initialDelay: { open: 0, close: 0 },
    delay: { open: 0, close: 0 },
    currentId: null,
    isInstantPhase: false,
  });

  constructor() {
    this.currentId = computed(() => this.state().currentId);
    this.delay = computed(() => this.state().delay);
    this.isInstantPhase = computed(() => this.state().isInstantPhase);
  }

  /** Sets the id of the currently active overlay of the group. */
  setCurrentId(currentId: string | null) {
    this.state.update((state) => {
      return {
        ...state,
        currentId,
        delay: updateDelay(currentId, state.initialDelay),
        isInstantPhase: updateInstantPhase(currentId, state),
      };
    });
  }

  /** Sets the delays that should be used by all the overlays in the group. */
  setDelay(delay: NatuOverlayDelayInput | undefined) {
    const normalizedDelay: NatuOverlayDelay = normalizeOverlayDelay(delay);

    this.state.update((state) => ({
      ...state,
      delay: normalizedDelay,
      initialDelay: normalizedDelay,
    }));
  }
}

function updateInstantPhase(currentId: string | null, state: State): boolean {
  if (currentId && state.currentId !== null) {
    return true;
  } else if (!currentId) {
    return false;
  } else {
    return state.isInstantPhase;
  }
}

function updateDelay(currentId: string | null, initialDelay: NatuOverlayDelay): NatuOverlayDelay {
  return currentId === null ? initialDelay : { open: 1, close: initialDelay.close };
}
