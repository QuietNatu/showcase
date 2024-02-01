import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, NgZone, assertInInjectionContext, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  ComputePositionReturn,
  Placement,
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import { signalSlice } from 'ngxtension/signal-slice';
import { EMPTY, Observable, combineLatest, from, map, shareReplay, switchMap } from 'rxjs';
import { runInZone } from '../utils';

export interface ManageFloatingOptions {
  defaultPlacement?: Placement;
  referenceOffset: number;
  pageMargin: number;
  arrowPadding: number;
}

export interface FloatingContext extends ComputePositionReturn {
  referenceElement: HTMLElement;
  floatingElement: HTMLElement;
}

interface GetComputedPositionOptions {
  referenceElement: HTMLElement;
  floatingElement: HTMLElement;
  arrowElement?: HTMLElement;
  placement?: Placement;
  referenceOffset: number;
  pageMargin: number;
  arrowPadding: number;
}

interface State {
  referenceElement: HTMLElement | null;
  floatingElement: HTMLElement | null;
  arrowElement: HTMLElement | null;
  placement: Placement | null;
}

const initialState: State = {
  referenceElement: null,
  floatingElement: null,
  arrowElement: null,
  placement: null,
};

export function manageFloating(options: ManageFloatingOptions) {
  assertInInjectionContext(manageFloating);

  const ngZone = inject(NgZone);

  return ngZone.runOutsideAngular(() => {
    const state = signalSlice({
      initialState,
      actionSources: {
        set: (_, action$: Observable<Partial<State>>) =>
          action$.pipe(map((newState) => ({ ...newState }))),
      },
    });

    const referenceElement$ = toObservable(state.referenceElement);
    const floatingElement$ = toObservable(state.floatingElement);
    const arrowElement$ = toObservable(state.arrowElement);
    const placement$ = toObservable(state.placement);

    const context$ = combineLatest([referenceElement$, floatingElement$]).pipe(
      switchMap(([referenceElement, floatingElement]) => {
        if (!referenceElement || !floatingElement) {
          return EMPTY;
        }

        const autoUpdate$ = startAutoUpdate(referenceElement, floatingElement);

        return combineLatest([arrowElement$, placement$, autoUpdate$]).pipe(
          map(
            ([arrowElement, placement]): GetComputedPositionOptions => ({
              referenceElement,
              floatingElement,
              arrowElement: arrowElement ?? undefined,
              placement: placement ?? options.defaultPlacement,
              referenceOffset: options.referenceOffset,
              pageMargin: options.pageMargin,
              arrowPadding: options.arrowPadding,
            }),
          ),
        );
      }),
      switchMap(getComputedPosition),
      runInZone(ngZone),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    const floatingStyle$ = context$.pipe(
      map(formatFloatingStyle),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    return {
      context$: toSignal(context$, { initialValue: null }),
      floatingStyle$: toSignal(floatingStyle$, { initialValue: null }),

      setPlacement: (placement: Placement) => {
        void state.set({ placement });
      },

      setReferenceElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        void state.set({ referenceElement: coerceElement(element) });
      },

      setFloatingElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        void state.set({ floatingElement: coerceElement(element) });
      },

      setArrowElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        void state.set({ arrowElement: coerceElement(element) });
      },
    };
  });
}

function startAutoUpdate(referenceElement: HTMLElement, floatingElement: HTMLElement) {
  return new Observable<void>((observer) => {
    const cleanup = autoUpdate(referenceElement, floatingElement, () => {
      observer.next();
    });

    return () => cleanup();
  });
}

function getComputedPosition(options: GetComputedPositionOptions) {
  const computedPosition = computePosition(options.referenceElement, options.floatingElement, {
    placement: options.placement,
    middleware: [
      offset(options.referenceOffset),
      flip(),
      shift({ padding: options.pageMargin }),
      options.arrowElement &&
        arrow({ element: options.arrowElement, padding: options.arrowPadding }),
    ],
  });

  return from(computedPosition).pipe(
    map(
      (result): FloatingContext => ({
        ...result,
        referenceElement: options.referenceElement,
        floatingElement: options.floatingElement,
      }),
    ),
  );
}

function formatFloatingStyle(context: FloatingContext): Partial<CSSStyleDeclaration> {
  const x = Math.round(context.x);
  const y = Math.round(context.y);

  const floatingStyle: Partial<CSSStyleDeclaration> = {
    position: context.strategy,
    left: '0',
    top: '0',
    transform: `translate(${x}px, ${y}px)`,
  };

  return floatingStyle;
}
