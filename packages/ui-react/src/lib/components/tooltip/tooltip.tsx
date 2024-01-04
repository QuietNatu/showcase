import { ReactNode, useRef, useState } from 'react';
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';

export interface NatuTooltipProps {
  children: ReactNode;
  content: ReactNode;
  // TODO: is open, open change
}

export function NatuTooltip(props: NatuTooltipProps) {
  const { isOpen, refs, arrowRef, context, floatingStyles, getFloatingProps, getReferenceProps } =
    useOverlay();

  return (
    <>
      <Slot ref={refs.setReference} {...getReferenceProps()}>
        {props.children}
      </Slot>

      {isOpen && (
        /* TODO: extract to component */
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            {props.content}

            <FloatingArrow ref={arrowRef} context={context} />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

// TODO: move consts to a config
const triggerOffset = 12;
const pageMargin = 8;
const arrowSize = 6;
const arrowPadding = 8;
const hoverDelay = 500;

// TODO: rename?
function useOverlay() {
  const [isOpen, setIsOpen] = useState(false); // TODO: controlled

  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(triggerOffset),
      flip(),
      shift({ padding: pageMargin }),
      arrow({ element: arrowRef, padding: arrowPadding }), // TODO: optional
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, delay: hoverDelay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context); // TODO: click outside

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss]);

  return {
    isOpen,
    refs,
    arrowRef,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
  };
}
