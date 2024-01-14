import { ComponentPropsWithoutRef, ReactNode, forwardRef, useEffect, useRef } from 'react';
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
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import { useControllableState } from '../../hooks/use-controllable-state';
import clsx from 'clsx';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';

type TooltipOverlayElementProps = Omit<ComponentPropsWithoutRef<'div'>, 'content'>;

export interface NatuTooltipProps extends TooltipOverlayElementProps {
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
const animationDuration = NATU_TIME_ANIMATION_STANDARD;
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
  const referenceRef = useRef(null);
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

  useEffect(() => {
    // Needed because refs.setReference causes conflict with Slot ref merge
    refs.setReference(referenceRef.current);
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: animationDuration,
    initial: ({ side }) => ({
      opacity: 0,
      transform: sideTransforms[side],
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role: 'tooltip' }),
    useHover(context, { move: false, delay: hoverDelay }),
    useFocus(context),
    useDismiss(context),
  ]);

  return {
    isMounted,
    referenceRef: referenceRef,
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
