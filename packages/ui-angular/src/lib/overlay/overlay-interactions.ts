import { assertInInjectionContext, computed, inject, isSignal, Signal } from '@angular/core';
import { NatuOverlayService } from './overlay.service';
import {
  EMPTY,
  asyncScheduler,
  filter,
  fromEvent,
  map,
  merge,
  observeOn,
  switchMap,
  timer,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { NatuPortalService } from '../portal';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NatuOverlayDelayGroupService } from './overlay-delay-group.service';
import { NatuOverlayDelayInput } from './overlay-types';
import { registerEffect } from '../utils';
import { normalizeOverlayDelay } from './overlay-utils';

interface HoverOptions {
  delay?: NatuOverlayDelayInput | Signal<NatuOverlayDelayInput>;
}

/**
 * Opens / Closes an overlay when it's reference element is hovered. Keeps overlay open if overlay is hovered.
 *
 * Must be used in conjunction with {@link NatuOverlayService} and {@link NatuPortalService}.
 */
export function useOverlayHover(options: HoverOptions = {}) {
  assertInInjectionContext(useOverlayHover);

  const portalService = inject(NatuPortalService);
  const overlayService = inject(NatuOverlayService);

  const delay = computed(() => {
    const coercedDelay = isSignal(options.delay) ? options.delay() : options.delay;
    return normalizeOverlayDelay(coercedDelay);
  });

  const referenceElement$ = toObservable(overlayService.referenceElement).pipe(filter(Boolean));
  const portalElement$ = toObservable(portalService.portalElement).pipe(filter(Boolean));

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

  const effect$ = merge(referenceEnter$, referenceLeave$, portalEnter$, portalLeave$).pipe(
    filter(() => !overlayService.isDisabled()),
    switchMap((shouldOpen) => {
      const currentDelay = shouldOpen ? delay().open : delay().close;
      return timer(currentDelay ?? 0).pipe(map(() => shouldOpen));
    }),
  );

  registerEffect(effect$, (shouldOpen) => {
    overlayService.changeOpen(shouldOpen);
  });
}

/**
 * Opens / Closes an overlay when it's reference element is focused / blurred.
 *
 * Must be used in conjunction with {@link NatuOverlayService}.
 */
export function useOverlayFocus() {
  assertInInjectionContext(useOverlayFocus);

  const document = inject(DOCUMENT);
  const focusMonitor = inject(FocusMonitor);
  const overlayService = inject(NatuOverlayService);

  const effect$ = toObservable(overlayService.referenceElement).pipe(
    filter((element): element is HTMLElement => Boolean(element) && element instanceof HTMLElement),
    switchMap((element) => focusMonitor.monitor(element)),
    filter((origin) => {
      const isValidEvent =
        origin === 'keyboard' || origin === 'program' || (origin === null && document.hasFocus());
      return !overlayService.isDisabled() && isValidEvent;
    }),
    map((origin) => origin !== null),
  );

  registerEffect(effect$, (shouldOpen) => {
    overlayService.changeOpen(shouldOpen);
  });
}

/**
 * Opens an overlay when it's reference element is clicked.
 *
 * Must be used in conjunction with {@link NatuOverlayService}.
 */
export function useOverlayClick() {
  assertInInjectionContext(useOverlayClick);

  const overlayService = inject(NatuOverlayService);

  const referenceElement$ = toObservable(overlayService.referenceElement).pipe(filter(Boolean));
  const customButtonElement$ = referenceElement$.pipe(
    filter((element) => element.tagName !== 'BUTTON'),
  );

  const click$ = referenceElement$.pipe(switchMap((element) => fromEvent(element, 'click')));

  const customPress$ = customButtonElement$.pipe(
    switchMap((element) => fromEvent<KeyboardEvent>(element, 'keydown')),
    filter((event) => event.key === 'Enter' || event.key === ' '),
    /**
     * Delays Keydown event.
     * Keydown event is triggered before a click event.
     * If an overlay with focus trap is opened via keydown, a click event will be triggered on the newly focused element.
     */
    observeOn(asyncScheduler),
  );

  const effect$ = merge(click$, customPress$);

  registerEffect(effect$, () => {
    overlayService.changeOpen(true);
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

  const effect$ = toObservable(overlayService.isOpen).pipe(
    switchMap((isOpen) => {
      if (!isOpen) {
        return EMPTY;
      }

      const escapePress$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        filter((event) => event.key === 'Escape'),
      );

      const clickOutside$ = fromEvent<MouseEvent>(document, 'mousedown').pipe(
        filter(
          (event) =>
            isTargetOutsideElement(event.target, portalService.portalElement()) &&
            isTargetOutsideElement(event.target, overlayService.referenceElement()),
        ),
      );

      return merge(escapePress$, clickOutside$);
    }),
  );

  registerEffect(effect$, () => {
    overlayService.changeOpen(false);
  });
}

function isTargetOutsideElement(target: EventTarget | null, element: Element | null) {
  return Boolean(target && target instanceof Element && element && !element.contains(target));
}

/**
 * Syncs overlay with a parent delay group.
 *
 * Must be used in conjunction with {@link NatuOverlayDelayGroupService} and {@link NatuOverlayService}.
 */
export function useOverlayDelayGroup() {
  assertInInjectionContext(useOverlayDelayGroup);

  const overlayDelayGroupService = inject(NatuOverlayDelayGroupService, { optional: true });

  if (!overlayDelayGroupService) {
    return;
  }

  const overlayService = inject(NatuOverlayService);
  const id = overlayService.floatingId;

  registerEffect(overlayDelayGroupService.currentId, (currentId) => {
    if (currentId !== id && overlayService.isOpen()) {
      // Wait for components with animations to update their duration
      void Promise.resolve().then(() => {
        overlayService.changeOpen(false);
      });
    }
  });

  registerEffect(overlayService.isOpen, (isOpen) => {
    if (isOpen) {
      overlayDelayGroupService.setCurrentId(id);
    } else if (overlayDelayGroupService.currentId() === id) {
      overlayDelayGroupService.setCurrentId(null);
    }
  });
}
