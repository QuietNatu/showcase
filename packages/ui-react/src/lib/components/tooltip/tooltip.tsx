import { HTMLAttributes, ReactNode, forwardRef, useRef } from 'react';
import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  Side,
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
  useTransitionStyles,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import { useControllableState } from '../../hooks/use-controllable-state';
import clsx from 'clsx';

type TooltipOverlayHTMLAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

export interface NatuTooltipProps extends TooltipOverlayHTMLAttributes {
  /** Reference element that will trigger the tooltip. */
  children: ReactNode;

  /** Content that will be shown by the tooltip. */
  content: ReactNode;

  /** Controlled open state. */
  isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  defaultIsOpen?: boolean;

  /** Controlled open state handler. */
  onOpenChange?: (isOpen: boolean) => void;

  /** Where to place the tooltip relative to the reference element. */
  placement?: NatuTooltipPlacement;
}

export type NatuTooltipPlacement = Placement;

interface UseTooltipOptions {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  placement?: NatuTooltipPlacement;
}

/* TODO: a11y */

export const NatuTooltip = forwardRef<HTMLDivElement, NatuTooltipProps>(
  function NatuTooltip(props, forwardedRef) {
    const {
      children,
      content,
      isOpen,
      defaultIsOpen,
      onOpenChange,
      placement,
      style,
      className,
      ...tooltipProps
    } = props;

    const tooltip = useTooltip({
      isOpen: props.isOpen,
      defaultIsOpen: props.defaultIsOpen,
      onOpenChange: props.onOpenChange,
      placement: props.placement,
    });

    return (
      <>
        <Slot ref={tooltip.referenceRef} {...tooltip.getReferenceProps()}>
          {props.children}
        </Slot>

        {tooltip.isMounted && (
          <FloatingPortal>
            <div
              ref={tooltip.floatingRef}
              style={tooltip.floatingStyles}
              {...tooltip.getFloatingProps()}
            >
              <div
                ref={forwardedRef}
                className={clsx('natu-tooltip', className)}
                style={{ ...tooltip.transitionStyles, ...style }}
                {...tooltipProps}
              >
                {props.content}

                <FloatingArrow
                  ref={tooltip.arrowRef}
                  context={tooltip.floatingContext}
                  width={tooltip.arrowWidth}
                  className="natu-tooltip__arrow"
                  height={tooltip.arrowHeight}
                />
              </div>
            </div>
          </FloatingPortal>
        )}
      </>
    );
  },
);

// TODO: move consts to a config
const pageMargin = 8;
const arrowWidth = 16;
const arrowHeight = 8;
const arrowPadding = 8;
const hoverDelay = 500;
const animationDuration = 200; // TODO: use design token?
const triggerOffset = arrowHeight + 4;
const defaultPlacement: NatuTooltipPlacement = 'top';

const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

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
    placement: options.placement ?? defaultPlacement,
    middleware: [
      offset(triggerOffset),
      flip(),
      shift({ padding: pageMargin }),
      arrow({ element: arrowRef, padding: arrowPadding }), // TODO: optional
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: animationDuration,
    initial: ({ side }) => ({
      opacity: 0,
      transform: sideTransforms[side],
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { move: false, delay: hoverDelay }),
    useFocus(context),
    useDismiss(context), // TODO: global click outside
  ]);

  return {
    isMounted,
    referenceRef: refs.setReference,
    floatingRef: refs.setFloating,
    arrowRef,
    floatingStyles: floatingStyles,
    floatingContext: context,
    getReferenceProps,
    getFloatingProps,
    transitionStyles: styles,
    arrowWidth,
    arrowHeight,
  };
}
