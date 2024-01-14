import { Placement, arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { useControllableState } from './use-controllable-state';
import { useEffect, useRef } from 'react';

export type NatuOverlayPlacement = Placement;

export interface NatuUseOverlayOptions {
  /** Controlled open state. */
  isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  defaultIsOpen?: boolean;

  /** Controlled open state handler. */
  onOpenChange?: (isOpen: boolean) => void;

  /** Where to place the tooltip relative to the reference element. */
  placement?: NatuOverlayPlacement;

  /** Whether to show or not an overlay arrow */
  hasArrow?: boolean;
}

const pageMargin = 8;
const arrowWidth = 16;
const arrowHeight = 8;
const arrowPadding = 8;
const triggerOffset = arrowHeight + 4;
const defaultPlacement: NatuOverlayPlacement = 'top';

/**
 * Provides data to position an overlay element, context to add interactions, and data to manage it's visibility.
 */
export function useOverlay(options: NatuUseOverlayOptions) {
  const [isOpen, setIsOpen] = useControllableState({
    value: options.isOpen,
    defaultValue: options.defaultIsOpen,
    finalValue: false,
    onChange: options.onOpenChange,
  });

  const arrowRef = useRef(null);
  const referenceRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: options.placement ?? defaultPlacement,
    middleware: [
      offset(triggerOffset),
      flip(),
      shift({ padding: pageMargin }),
      options.hasArrow && arrow({ element: arrowRef, padding: arrowPadding }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    // Needed because refs.setReference causes conflict with Slot ref merge
    refs.setReference(referenceRef.current);
  });

  return {
    isOpen,
    refs,
    referenceRef,
    context,
    floatingStyles,
    arrowRef,
    arrowWidth,
    arrowHeight,
  };
}
