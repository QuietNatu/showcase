import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import {
  FloatingArrow,
  FloatingPortal,
  Side,
  useDelayGroup,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuOverlayPlacement, NatuUseOverlayOptions, useOverlay } from '../../hooks/use-overlay';
import { createContext } from '../../utils';
import { useTooltipDelay } from './use-tooltip-delay';

export interface NatuTooltipProps {
  readonly children?: ReactNode;

  /** Controlled open state. */
  readonly isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  readonly defaultIsOpen?: boolean;

  /** Controlled open state handler. */
  readonly onOpenChange?: (isOpen: boolean) => void;

  /** Where to place the tooltip relative to the reference element. */
  readonly placement?: NatuTooltipPlacement;

  /** Whether the tooltip should be disabled. */
  readonly isDisabled?: boolean;
}

export type NatuTooltipTriggerProps = ComponentPropsWithoutRef<'div'>;
export type NatuTooltipContentProps = ComponentPropsWithoutRef<'div'>;
export type NatuTooltipPlacement = NatuOverlayPlacement;

const [TooltipProvider, useTooltipContext] = createContext<ReturnType<typeof useTooltip>>({
  name: 'TooltipContext',
});

/**
 * Displays content on an overlay when an element is focused or hovered.
 *
 * Contains all the parts of a tooltip.
 */
export function NatuTooltip(props: NatuTooltipProps) {
  const tooltip = useTooltip({
    isOpen: props.isOpen,
    defaultIsOpen: props.defaultIsOpen,
    onOpenChange: props.onOpenChange,
    placement: props.placement,
    isDisabled: props.isDisabled,
    hasArrow: true,
  });

  return <TooltipProvider value={tooltip}>{props.children}</TooltipProvider>;
}

/**
 * The element that toggles the tooltip.
 */
export const NatuTooltipTrigger = forwardRef<HTMLElement, NatuTooltipTriggerProps>(
  function NatuTooltipTrigger(props, forwardedRef) {
    const tooltip = useTooltipContext();
    const ref = useMergeRefs([tooltip.referenceRef, forwardedRef]);

    return (
      <Slot ref={ref} {...tooltip.getReferenceProps(props)}>
        {props.children}
      </Slot>
    );
  },
);

/**
 * The component that pops out when the tooltip is open.
 */
export const NatuTooltipContent = forwardRef<HTMLDivElement, NatuTooltipContentProps>(
  function NatuPopoverContent(props: NatuTooltipContentProps, forwardedRef) {
    const { className, style, ...tooltipProps } = props;

    const tooltip = useTooltipContext();

    if (!tooltip.isMounted) {
      return null;
    }

    return (
      <FloatingPortal>
        <div ref={tooltip.floatingRef} style={tooltip.floatingStyles}>
          <div
            ref={forwardedRef}
            className={clsx('natu-tooltip', className)}
            style={{ ...tooltip.transitionStyles, ...style }}
            {...tooltip.getFloatingProps(tooltipProps)}
          >
            <div>{props.children}</div>

            <FloatingArrow
              ref={tooltip.arrowRef}
              context={tooltip.floatingContext}
              width={tooltip.arrowWidth}
              height={tooltip.arrowHeight}
              className="natu-tooltip__arrow"
            />
          </div>
        </div>
      </FloatingPortal>
    );
  },
);

const animationDuration = NATU_TIME_ANIMATION_STANDARD;

const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

function useTooltip(options: NatuUseOverlayOptions) {
  const { context, refs, referenceRef, arrowRef, arrowHeight, arrowWidth, floatingStyles } =
    useOverlay(options);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { delay: groupDelay, currentId, isInstantPhase } = useDelayGroup(context);

  const isCurrentId = currentId === context.floatingId;
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: isInstantPhase
      ? { open: 0, close: isCurrentId ? animationDuration : 0 }
      : animationDuration,
    initial: ({ side }) => ({
      opacity: 0,
      transform: sideTransforms[side],
    }),
  });

  const enabled = !options.isDisabled;
  const hoverDelay = useTooltipDelay();
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role: 'tooltip', enabled }),
    useHover(context, { move: false, delay: groupDelay === 0 ? hoverDelay : groupDelay, enabled }),
    useFocus(context, { enabled }),
    useDismiss(context, { enabled }),
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
