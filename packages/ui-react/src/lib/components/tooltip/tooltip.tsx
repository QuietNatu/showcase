import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  Side,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuUseOverlayOptions, useOverlay } from '../../hooks/use-overlay';
import { useNatuUiConfig } from '../../providers/ui-config';

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

const defaultHoverDelay = 500;
const animationDuration = NATU_TIME_ANIMATION_STANDARD;

const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

function useTooltip(options: NatuUseOverlayOptions) {
  const { tooltip: tooltipConfig } = useNatuUiConfig();
  const hoverDelay = tooltipConfig?.hoverDelay ?? defaultHoverDelay;

  const { context, refs, referenceRef, arrowRef, arrowHeight, arrowWidth, floatingStyles } =
    useOverlay(options);

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
