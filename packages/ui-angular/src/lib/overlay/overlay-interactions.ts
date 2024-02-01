import { assertInInjectionContext, inject } from '@angular/core';
import { NatuOverlayService } from './overlay.service';
import { filter, fromEvent, map, merge, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

interface UseOverlayOptions {
  delay?: number;
}

/**
 * Opens / Closes an overlay when it's reference element is hovered.
 *
 * Must be used in conjunction with {@link NatuOverlayService}.
 */
export function useOverlayHover(options: UseOverlayOptions = {}) {
  assertInInjectionContext(useOverlayHover);

  const overlayService = inject(NatuOverlayService);
  const delay = options.delay ?? 0;

  toObservable(overlayService.referenceElement$)
    .pipe(
      filter(Boolean),
      switchMap((element) => {
        const mouseEnter$ = fromEvent(element, 'mouseenter').pipe(map(() => true));
        const mouseLeave$ = fromEvent(element, 'mouseleave').pipe(map(() => false));

        return merge(mouseEnter$, mouseLeave$).pipe(
          switchMap((shouldOpen) =>
            timer(delay).pipe(
              filter(() => shouldOpen !== overlayService.isOpen$()),
              map(() => shouldOpen),
            ),
          ),
        );
      }),
      takeUntilDestroyed(),
    )
    .subscribe((shouldOpen) => {
      /* TODO: rethink this? */
      if (shouldOpen) {
        overlayService.open();
      } else {
        overlayService.close();
      }
    });
}
