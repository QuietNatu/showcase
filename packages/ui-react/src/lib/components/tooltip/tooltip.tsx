import { HTMLAttributes, ReactNode, Ref, forwardRef, useRef } from 'react';
import {
  FloatingArrow,
  FloatingContext,
  FloatingPortal,
  ReferenceType,
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
import { useControllableState } from '../../hooks/use-controllable-state';

export interface NatuTooltipProps {
  /** Reference element that will trigger the tooltip. */
  children: ReactNode;

  /** Content that will be shown by the tooltip. */
  content: ReactNode;

  /** Controlled open state. */
  isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  defaultIsOpen?: boolean;

  /** Controlled open state handler */
  onOpenChange?: (isOpen: boolean) => void;
}

interface TooltipOverlayProps<T extends ReferenceType = ReferenceType>
  extends HTMLAttributes<HTMLDivElement> {
  floatingContext: FloatingContext<T>;
  arrowRef: Ref<SVGSVGElement>;
  arrowWidth: number;
  arrowHeight: number;
  children: ReactNode;
}

interface UseTooltipOptions {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function NatuTooltip(props: NatuTooltipProps) {
  const tooltip = useTooltip({
    isOpen: props.isOpen,
    defaultIsOpen: props.defaultIsOpen,
    onOpenChange: props.onOpenChange,
  });

  return (
    <>
      <Slot ref={tooltip.referenceRef} {...tooltip.getReferenceProps()}>
        {props.children}
      </Slot>

      {tooltip.isOpen && (
        <TooltipOverlay
          ref={tooltip.floatingRef}
          arrowRef={tooltip.arrowRef}
          arrowWidth={tooltip.arrowWidth}
          arrowHeight={tooltip.arrowHeight}
          floatingContext={tooltip.floatingContext}
          style={tooltip.floatingStyles}
          {...tooltip.getFloatingProps()}
        >
          {props.content}
        </TooltipOverlay>
      )}
    </>
  );
}

const TooltipOverlay = forwardRef<HTMLDivElement, TooltipOverlayProps>(
  function TooltipOverlay(props, ref) {
    const { children, floatingContext, arrowRef, arrowWidth, arrowHeight, ...overlayProps } = props;

    return (
      <FloatingPortal>
        <div ref={ref} {...overlayProps} className="natu-tooltip">
          {children}

          <FloatingArrow
            ref={arrowRef}
            context={floatingContext}
            className="natu-tooltip__arrow"
            width={arrowWidth}
            height={arrowHeight}
          />
        </div>
      </FloatingPortal>
    );
  },
);

/* TODO: placement */

// TODO: move consts to a config
const pageMargin = 8;
const arrowWidth = 16;
const arrowHeight = 8;
const arrowPadding = 8;
const hoverDelay = 500;
const triggerOffset = arrowHeight + 4;

function useTooltip(options: UseTooltipOptions) {
  const [isOpen, setIsOpen] = useControllableState({
    value: options.isOpen,
    defaultValue: options.defaultIsOpen,
    finalValue: false,
    onChange: options.onOpenChange,
  });

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
    referenceRef: refs.setReference,
    floatingRef: refs.setFloating,
    arrowRef,
    floatingStyles,
    floatingContext: context,
    getReferenceProps,
    getFloatingProps,
    arrowWidth,
    arrowHeight,
  };
}
