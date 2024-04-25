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
import { NatuCard, NatuCardBody, NatuCardHeader } from '../card/card';

type PopoverOverlayElementProps = Omit<ComponentPropsWithoutRef<'div'>, 'content' | 'title'>;

export interface NatuPopoverProps extends PopoverOverlayElementProps {
  /** Reference element that will trigger the popover. */
  children: ReactNode;

  /** Title that will be shown by the popover. */
  title?: ReactNode;

  /** Content that will be shown by the popover. */
  content: ReactNode;

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

export type NatuPopoverPlacement = NatuOverlayPlacement;

export const NatuPopover = forwardRef<HTMLDivElement, NatuPopoverProps>(
  function NatuPopover(props, forwardedRef) {
    const {
      children,
      title,
      content,
      isOpen,
      defaultIsOpen,
      onOpenChange,
      placement,
      isDisabled,
      style,
      className,
      ...popoverProps
    } = props;

    const popover = usePopover({
      isOpen: isOpen,
      defaultIsOpen: defaultIsOpen,
      onOpenChange: onOpenChange,
      placement: placement,
      isDisabled: isDisabled,
      hasArrow: true,
    });

    return (
      <>
        <Slot ref={popover.referenceRef} {...popover.getReferenceProps()}>
          {props.children}
        </Slot>

        {popover.isMounted && (
          <FloatingPortal>
            <FloatingFocusManager context={popover.floatingContext}>
              <div
                ref={popover.floatingRef}
                style={popover.floatingStyles}
                {...popover.getFloatingProps()}
              >
                <div
                  ref={forwardedRef}
                  className={clsx('natu-popover', className)}
                  style={{ ...popover.transitionStyles, ...style }}
                  {...popoverProps}
                >
                  <NatuCard isEmbedded={true} isDismissable={true} onDismiss={popover.onDismiss}>
                    {title && <NatuCardHeader size="small">{title}</NatuCardHeader>}
                    <NatuCardBody>{content}</NatuCardBody>
                  </NatuCard>

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
        )}
      </>
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
