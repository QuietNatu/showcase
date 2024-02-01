import { assertInInjectionContext, inject } from '@angular/core';
import { NatuOverlayService } from './overlay.service';
import { EMPTY, filter, fromEvent, map, merge, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { NatuPortalService } from '../portal';

interface HoverOptions {
  delay?: number;
}

/* TODO: do not close if hover is on floating element */
/* TODO: test */

/**
 * Opens / Closes an overlay when it's reference element is hovered.
 *
 * Must be used in conjunction with {@link NatuOverlayService}.
 */
export function useOverlayHover(options: HoverOptions = {}) {
  assertInInjectionContext(useOverlayHover);

  const overlayService = inject(NatuOverlayService);
  const delay = options.delay ?? 0;

  toObservable(overlayService.referenceElement$)
    .pipe(
      switchMap((element) => {
        if (!element) {
          return EMPTY;
        }

        const mouseEnter$ = fromEvent(element, 'mouseenter').pipe(map(() => true));
        const mouseLeave$ = fromEvent(element, 'mouseleave').pipe(map(() => false));

        return merge(mouseEnter$, mouseLeave$).pipe(
          switchMap((shouldOpen) =>
            timer(delay).pipe(
              // TODO: check if this verification is needed
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

/**
 * Closes an overlay when the `Escape` key is pressed or when a click happens outside the overlay.
 *
 * Must be used in conjunction with {@link NatuOverlayService} and {@link NatuPortalService}.
 */
export function useOverlayDismiss() {
  assertInInjectionContext(useOverlayDismiss);

  const document = inject(DOCUMENT);
  const portalService = inject(NatuPortalService);
  const overlayService = inject(NatuOverlayService);

  toObservable(overlayService.isOpen$)
    .pipe(
      switchMap((isOpen) => {
        // TODO: isOpen or isMounted?
        if (!isOpen) {
          return EMPTY;
        }

        const escapePress$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
          filter((event) => event.key === 'Escape'),
        );

        const clickOutside$ = fromEvent<MouseEvent>(document, 'mousedown').pipe(
          filter((event) => {
            const target = event.target;
            const portalElement = portalService.portalElement$();

            return Boolean(
              target &&
                target instanceof Element &&
                portalElement &&
                !portalElement.contains(target),
            );
          }),
        );

        return merge(escapePress$, clickOutside$);
      }),
      takeUntilDestroyed(),
    )
    .subscribe(() => {
      overlayService.close();
    });
}
