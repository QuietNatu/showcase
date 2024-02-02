import { ElementRef, Injectable, TemplateRef } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, Subject, filter, map, merge, switchMap } from 'rxjs';
import { Placement } from '@floating-ui/dom';
import { manageFloating } from './floating-adapter';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export type NatuOverlayPlacement = Placement;

/* TODO: add styles https://floating-ui.com/docs/computePosition */

const pageMargin = 8;
const arrowWidth = 16;
const arrowHeight = 8;
const arrowPadding = 8;
const referenceOffset = arrowHeight + 4;
const defaultPlacement: NatuOverlayPlacement = 'top';

interface State {
  content: string | TemplateRef<unknown> | null;
  isOpen: boolean;
  isDisabled: boolean;
  hasTransitions: boolean;
}

const initialState: State = {
  content: null,
  isOpen: false,
  isDisabled: false,
  hasTransitions: false,
};

/* TODO: docs */

@Injectable()
export class NatuOverlayService {
  readonly arrowWidth = arrowWidth;
  readonly arrowHeight = arrowHeight;

  readonly referenceElement$;
  readonly floatingElement$;
  readonly context$;
  readonly floatingStyle$;
  /* TODO: support multiple templates */
  readonly content$;
  readonly isOpen$;
  readonly isMounted$;

  private readonly unmount$ = new Subject<void>();

  /* TODO: check if this will actually be needed */
  private readonly state = signalSlice({
    initialState,
    actionSources: {
      set: (_, action$: Observable<Partial<State>>) =>
        action$.pipe(map((newState) => ({ ...newState }))),
    },
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
    this.content$ = this.state.content;
    this.isOpen$ = this.state.isOpen;
    /**
     * Whether the overlay should be rendered or not.
     */
    this.isMounted$ = this.getIsMounted();
  }

  setContent(content: string | TemplateRef<unknown>) {
    void this.state.set({ content });
  }

  /* TODO: remove? */
  /* TODO: controlled and uncontrolled isOpen */
  setIsOpen(isOpen: boolean) {
    void this.state.set({ isOpen });
  }

  setIsDisabled(isDisabled: boolean) {
    void this.state.set({ isDisabled });
  }

  setPlacement(placement: NatuOverlayPlacement) {
    this.floatingManager.setPlacement(placement);
  }

  setReferenceElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setReferenceElement(element);
  }

  setFloatingElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setFloatingElement(element);
  }

  setArrowElement(element: ElementRef<HTMLElement> | HTMLElement | null) {
    this.floatingManager.setArrowElement(element);
  }

  open() {
    /* TODO: change this to handle controlled inputs */
    void this.state.set({ isOpen: true });
  }

  close() {
    /* TODO: change this to handle controlled inputs */
    void this.state.set({ isOpen: false });
  }

  /**
   * Whether overlay should wait for a transition to end before closing.
   *
   * `unmount` event must be triggered for overlay to close.
   */
  setHasTransitions(hasTransitions: boolean) {
    void this.state.set({ hasTransitions });
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
    const isOpen$ = toObservable(this.state.isOpen);
    const mount$ = isOpen$.pipe(filter(Boolean));
    const unmount$ = this.unmount$.pipe(map(() => false));
    const isMounted$ = merge(mount$, unmount$);

    const value$ = toObservable(this.state.hasTransitions).pipe(
      switchMap((hasTransitions) => (hasTransitions ? isMounted$ : isOpen$)),
    );

    return toSignal(value$, { initialValue: false });
  }
}
