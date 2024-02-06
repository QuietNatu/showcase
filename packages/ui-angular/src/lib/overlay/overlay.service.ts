import { ElementRef, Injectable, TemplateRef, computed, signal } from '@angular/core';
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

/* TODO: docs */

@Injectable()
export class NatuOverlayService {
  readonly arrowWidth = arrowWidth;
  readonly arrowHeight = arrowHeight;
  readonly floatingId = crypto.randomUUID();

  readonly referenceElement$;
  readonly floatingElement$;
  readonly context$;
  readonly floatingStyle$;
  /* TODO: support multiple templates */
  readonly content$;
  readonly contentContext$;
  readonly isOpen$;
  readonly isOpenChange$ = new Subject<boolean>();
  /** Whether the overlay should be rendered or not. */
  readonly isMounted$;
  readonly isDisabled$;

  private readonly unmount$ = new Subject<void>();

  private readonly contentSignal$ = signal<string | TemplateRef<unknown> | null>(null);
  private readonly contentContextSignal$ = signal<object | null>(null);
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
    this.content$ = this.contentSignal$.asReadonly();
    this.contentContext$ = this.contentContextSignal$.asReadonly();
    this.isDisabled$ = this.isDisabledSignal$.asReadonly();
    this.isOpen$ = computed(() => (this.isDisabledSignal$() ? false : this.isOpenManager.value$()));
    this.isMounted$ = this.getIsMounted();
  }

  setContent(content: string | TemplateRef<unknown>) {
    this.contentSignal$.set(content);
  }

  setContentContext(context: object | null) {
    this.contentContextSignal$.set(context);
  }

  setIsOpen(isOpen: boolean | undefined) {
    this.controlledIsOpen$.set(isOpen);
  }

  setDefaultIsOpen(defaultIsOpen: boolean | undefined) {
    this.defaultIsOpen$.set(defaultIsOpen);
  }

  setIsDisabled(isDisabled: boolean) {
    this.isDisabledSignal$.set(isDisabled);
  }

  setPlacement(placement: NatuOverlayPlacement | null) {
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
