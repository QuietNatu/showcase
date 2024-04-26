import { ComponentPropsWithoutRef, ReactNode, forwardRef, useCallback } from 'react';
import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  Side,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuOverlayPlacement, NatuUseOverlayOptions, useOverlay } from '../../hooks/use-overlay';
import { createContext } from '../../hooks';

export interface NatuPopoverProps {
  children?: ReactNode;

  /** Controlled open state. */
  isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  defaultIsOpen?: boolean;

  /** Controlled open state handler. */
  onOpenChange?: (isOpen: boolean) => void;

  /** Where to place the popover relative to the reference element. */
  placement?: NatuPopoverPlacement;

  /** Whether the popover should be disabled. */
  isDisabled?: boolean;
}

export interface NatuPopoverTriggerProps {
  children?: ReactNode;
}

export interface NatuPopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Whether the popover has embedded content (like Card) and thus should not be styled. */
  hasEmbeddedContent?: boolean;
}

export type NatuPopoverPlacement = NatuOverlayPlacement;

const [PopoverProvider, usePopoverContext] = createContext<ReturnType<typeof usePopover>>({
  name: 'PopoverContext',
});

export function NatuPopover(props: NatuPopoverProps) {
  const popover = usePopover({
    isOpen: props.isOpen,
    defaultIsOpen: props.defaultIsOpen,
    onOpenChange: props.onOpenChange,
    placement: props.placement,
    isDisabled: props.isDisabled,
    hasArrow: true,
  });

  return <PopoverProvider value={popover}>{props.children}</PopoverProvider>;
}

export function NatuPopoverTrigger(props: NatuPopoverTriggerProps) {
  const popover = usePopoverContext();

  return (
    <Slot ref={popover.referenceRef} {...popover.getReferenceProps()}>
      {props.children}
    </Slot>
  );
}

export const NatuPopoverContent = forwardRef<HTMLDivElement, NatuPopoverContentProps>(
  function NatuPopoverContent(props: NatuPopoverContentProps, forwardedRef) {
    const { hasEmbeddedContent, className, style, ...popoverProps } = props;

    const popover = usePopoverContext();

    if (!popover.isMounted) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingFocusManager context={popover.floatingContext}>
          <div ref={popover.floatingRef} style={popover.floatingStyles}>
            <div
              ref={forwardedRef}
              className={clsx(
                'natu-popover',
                { 'natu-popover--has-embedded': hasEmbeddedContent },
                className,
              )}
              style={{ ...popover.transitionStyles, ...style }}
              {...popover.getFloatingProps(popoverProps)}
            >
              <div>{props.children}</div>

              <FloatingArrow
                ref={popover.arrowRef}
                context={popover.floatingContext}
                width={popover.arrowWidth}
                height={popover.arrowHeight}
                className="natu-popover__arrow"
              />
            </div>
          </div>
        </FloatingFocusManager>
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

function usePopover(options: NatuUseOverlayOptions) {
  const {
    context,
    refs,
    referenceRef,
    arrowRef,
    arrowHeight,
    arrowWidth,
    floatingStyles,
    setIsOpen,
  } = useOverlay(options);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: animationDuration,
    initial: ({ side }) => ({
      opacity: 0,
      transform: sideTransforms[side],
    }),
  });

  const enabled = !options.isDisabled;
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role: 'dialog', enabled }),
    useClick(context, { enabled }),
    useDismiss(context, { enabled }),
  ]);

  const handleDismiss = useCallback(() => setIsOpen(false), [setIsOpen]);

  return {
    isMounted,
    onDismiss: handleDismiss,
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
