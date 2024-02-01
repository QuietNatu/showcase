import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, NgZone, assertInInjectionContext, inject, signal } from '@angular/core';
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
import { EMPTY, Observable, combineLatest, from, map, shareReplay, switchMap } from 'rxjs';
import { runInZone } from '../utils';

export interface ManageFloatingOptions {
  defaultPlacement?: Placement;
  referenceOffset: number;
  pageMargin: number;
  arrowPadding: number;
}

export type FloatingContext = ComputePositionReturn;

interface GetComputedPositionOptions {
  referenceElement: HTMLElement;
  floatingElement: HTMLElement;
  arrowElement?: HTMLElement;
  placement?: Placement;
  referenceOffset: number;
  pageMargin: number;
  arrowPadding: number;
}

export function manageFloating(options: ManageFloatingOptions) {
  assertInInjectionContext(manageFloating);

  const ngZone = inject(NgZone);

  return ngZone.runOutsideAngular(() => {
    const referenceElement = signal<HTMLElement | null>(null);
    const floatingElement = signal<HTMLElement | null>(null);
    const arrowElement = signal<HTMLElement | null>(null);
    const placement = signal<Placement | null>(null);

    const referenceElement$ = toObservable(referenceElement);
    const floatingElement$ = toObservable(floatingElement);
    const arrowElement$ = toObservable(arrowElement);
    const placement$ = toObservable(placement);

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
      referenceElement$: referenceElement,
      floatingElement$: floatingElement,
      context$: toSignal(context$, { initialValue: null }),
      floatingStyle$: toSignal(floatingStyle$, { initialValue: null }),

      setPlacement: (newPlacement: Placement | null) => {
        placement.set(newPlacement);
      },

      setReferenceElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        referenceElement.set(coerceElement(element));
      },

      setFloatingElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        floatingElement.set(coerceElement(element));
      },

      setArrowElement: (element: ElementRef<HTMLElement> | HTMLElement | null) => {
        arrowElement.set(coerceElement(element));
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

  return from(computedPosition);
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
