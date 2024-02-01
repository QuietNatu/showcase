import { Renderer2, assertInInjectionContext, effect, inject, untracked } from '@angular/core';
import { NatuOverlayService } from './overlay.service';

/* TODO: docs */

export function useOverlayHover() {
  assertInInjectionContext(useOverlayHover);

  const renderer = inject(Renderer2);
  const overlayService = inject(NatuOverlayService);

  effect((onCleanup) => {
    const referenceElement = overlayService.referenceElement$();

    if (!referenceElement) {
      return;
    }

    const unlistenMouseEnter = renderer.listen(referenceElement, 'mouseenter', () => {
      untracked(() => overlayService.open());
    });

    const unlistenMouseLeave = renderer.listen(referenceElement, 'mouseleave', () => {
      untracked(() => overlayService.close());
    });

    onCleanup(() => {
      unlistenMouseEnter();
      unlistenMouseLeave();
    });
  });

  return {
    setDelay() {
      // TODO
    },
  };
}
