import { assertInInjectionContext, inject } from '@angular/core';
import { NatuOverlayService } from './overlay.service';
import { EMPTY, filter, fromEvent, map, merge, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { NatuPortalService } from '../portal';

interface HoverOptions {
  delay?: number;
}

/* TODO: test */

/**
 * Opens / Closes an overlay when it's reference element is hovered. Keeps overlay open if overlay is hovered.
 *
 * Must be used in conjunction with {@link NatuOverlayService} and {@link NatuPortalService}.
 */
export function useOverlayHover(options: HoverOptions = {}) {
  assertInInjectionContext(useOverlayHover);

  const portalService = inject(NatuPortalService);
  const overlayService = inject(NatuOverlayService);
  const delay = options.delay ?? 0;

  const referenceElement$ = toObservable(overlayService.referenceElement$).pipe(filter(Boolean));
  const portalElement$ = toObservable(portalService.portalElement$).pipe(filter(Boolean));

  const referenceEnter$ = referenceElement$.pipe(
    switchMap((element) => fromEvent(element, 'mouseenter')),
    map(() => true),
  );

  const referenceLeave$ = referenceElement$.pipe(
    switchMap((element) => fromEvent(element, 'mouseleave')),
    map(() => false),
  );

  const portalEnter$ = portalElement$.pipe(
    switchMap((element) => fromEvent(element, 'mouseenter')),
    map(() => true),
  );

  const portalLeave$ = portalElement$.pipe(
    switchMap((element) => fromEvent(element, 'mouseleave')),
    map(() => false),
  );

  merge(referenceEnter$, referenceLeave$, portalEnter$, portalLeave$)
    .pipe(
      switchMap((shouldOpen) => timer(delay).pipe(map(() => shouldOpen))),
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
 * Closes an overlay when the `Escape` key is pressed or when a click happens outside the overlay and it's reference.
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
          filter(
            (event) =>
              isTargetOutsideElement(event.target, portalService.portalElement$()) &&
              isTargetOutsideElement(event.target, overlayService.referenceElement$()),
          ),
        );

        return merge(escapePress$, clickOutside$);
      }),
      takeUntilDestroyed(),
    )
    .subscribe(() => {
      overlayService.close();
    });
}

function isTargetOutsideElement(target: EventTarget | null, element: HTMLElement | null) {
  return Boolean(target && target instanceof Element && element && !element.contains(target));
}
