import { ElementRef, Injectable, TemplateRef } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map } from 'rxjs';
import { Placement } from '@floating-ui/dom';
import { manageFloating } from './floating-adapter';

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
}

const initialState: State = {
  content: null,
  isOpen: false,
  isDisabled: false,
};

/* TODO: docs */

@Injectable()
export class NatuOverlayService {
  readonly arrowWidth = arrowWidth;
  readonly arrowHeight = arrowHeight;

  readonly overlayData$;
  /* TODO: support multiple templates */
  readonly content$;
  readonly isOpen$;

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
    this.overlayData$ = this.floatingManager.data$;
    this.content$ = this.state.content;
    this.isOpen$ = this.state.isOpen;

    // TODO: animations should not be here
    // this.isMounted$ = toObservable(this.state.isOpen).pipe(
    //   // TODO: animation time
    //   switchMap((isOpen) => (isOpen ? of(true) : timer(200).pipe(map(() => false)))),
    // );
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
}
