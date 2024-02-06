import { ElementRef, Injectable, computed, signal } from '@angular/core';
import { Subject, filter, map, merge, switchMap } from 'rxjs';
import { Placement } from '@floating-ui/dom';
import { manageFloating } from './floating-adapter';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { controllableSignal } from '../utils';

export type NatuOverlayPlacement = Placement;

const pageMargin = 8;
const arrowWidth = 16;
const arrowHeight = 8;
const arrowPadding = 8;
const referenceOffset = arrowHeight + 4;
const defaultPlacement: NatuOverlayPlacement = 'top';

/* TODO: test */

/**
 * Manages data and performs calculations required to position an overlay element on the page.
 *
 * This is the basis for all overlay elements and is required by other overlay utilities like interactions or components.
 */
@Injectable()
export class NatuOverlayService {
  readonly arrowWidth = arrowWidth;
  readonly arrowHeight = arrowHeight;
  /** Id to use for the floating element */
  readonly floatingId = crypto.randomUUID();

  /** Element that serves as the anchor for the position of the overlay. */
  readonly referenceElement$;
  /** Element that floats nexts to the reference element and remains anchored to. Represents the overlay itself. */
  readonly floatingElement$;
  /** Result of the overlay calculations. */
  readonly context$;
  /** Styles that should be applied to the floating element */
  readonly floatingStyle$;
  /** Controlled open state. */
  readonly isOpen$;
  /** Controlled open state notifier. */
  readonly isOpenChange$ = new Subject<boolean>();
  /** Whether the overlay should be rendered or not. */
  readonly isMounted$;
  /** Whether the tooltip should be disabled. */
  readonly isDisabled$;

  private readonly unmount$ = new Subject<void>();

  private readonly isDisabledSignal$ = signal(false);
  private readonly hasTransitions$ = signal(false);
  private readonly controlledIsOpen$ = signal<boolean | undefined>(undefined);
  private readonly defaultIsOpen$ = signal<boolean | undefined>(undefined);

  private readonly isOpenManager = controllableSignal<boolean>({
    value$: this.controlledIsOpen$,
    defaultValue$: this.defaultIsOpen$,
    finalValue: false,
    onChange: (isOpen) => this.isOpenChange$.next(isOpen),
  });

  private readonly floatingManager = manageFloating({
    referenceOffset,
    pageMargin,
    arrowPadding,
    defaultPlacement,
  });

  constructor() {
    this.referenceElement$ = this.floatingManager.referenceElement$;
    this.floatingElement$ = this.floatingManager.floatingElement$;
    this.context$ = this.floatingManager.context$;
    this.floatingStyle$ = this.floatingManager.floatingStyle$;
    this.isDisabled$ = this.isDisabledSignal$.asReadonly();
    this.isOpen$ = computed(() => (this.isDisabledSignal$() ? false : this.isOpenManager.value$()));
    this.isMounted$ = this.getIsMounted();
  }

  /** Controlled open state. */
  setIsOpen(isOpen: boolean | undefined) {
    this.controlledIsOpen$.set(isOpen);
  }

  /** Default value for uncontrolled open state. */
  setDefaultIsOpen(defaultIsOpen: boolean | undefined) {
    this.defaultIsOpen$.set(defaultIsOpen);
  }

  /** Whether the tooltip should be disabled. */
  setIsDisabled(isDisabled: boolean) {
    this.isDisabledSignal$.set(isDisabled);
  }

  /** Where to place the tooltip relative to the reference element. */
  setPlacement(placement: NatuOverlayPlacement | null) {
    this.floatingManager.setPlacement(placement);
  }

  /** Element that serves as the anchor for the position of the overlay. */
  setReferenceElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setReferenceElement(element);
  }

  /** Element that floats nexts to the reference element and remains anchored to. Represents the overlay itself. */
  setFloatingElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setFloatingElement(element);
  }

  /** Element that represents the overlay's arrow. */
  setArrowElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setArrowElement(element);
  }

  /** Uncontrolled open state. */
  changeOpen(isOpen: boolean) {
    if (!this.isDisabledSignal$()) {
      this.isOpenManager.change(isOpen);
    }
  }

  /**
   * Whether overlay should wait for a transition to end before closing.
   *
   * `unmount` event must be triggered for overlay to close.
   */
  setHasTransitions(hasTransitions: boolean) {
    this.hasTransitions$.set(hasTransitions);
  }

  /**
   * Signals that overlay can be unmounted. Only works if transitions are enabled with `setHasTransitions(true)`.
   *
   * Use this, for example, to trigger the end of a close animation.
   */
  unmount() {
    this.unmount$.next();
  }

  private getIsMounted() {
    const isOpen$ = toObservable(this.isOpen$);
    const mount$ = isOpen$.pipe(filter(Boolean));
    const unmount$ = this.unmount$.pipe(map(() => false));
    const isMounted$ = merge(mount$, unmount$);

    const valueObservable$ = toObservable(this.hasTransitions$).pipe(
      switchMap((hasTransitions) => (hasTransitions ? isMounted$ : isOpen$)),
    );

    const value$ = toSignal(valueObservable$, { initialValue: false });

    return computed(() => (this.isDisabledSignal$() ? false : value$()));
  }
}
