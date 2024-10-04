import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { NatuOverlayPlacement } from '../../hooks/use-overlay';
import { PopoverProvider, usePopover, usePopoverContext } from './use-popover';

export interface NatuPopoverProps {
  readonly children?: ReactNode;

  /** Controlled open state. */
  readonly isOpen?: boolean;

  /** Default value for uncontrolled open state. */
  readonly defaultIsOpen?: boolean;

  /** Controlled open state handler. */
  readonly onOpenChange?: (isOpen: boolean) => void;

  /** Where to place the popover relative to the reference element. */
  readonly placement?: NatuPopoverPlacement;

  /** Whether the popover should be disabled. */
  readonly isDisabled?: boolean;
}

export type NatuPopoverTriggerProps = ComponentPropsWithoutRef<'div'>;

export interface NatuPopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Whether the popover has embedded content (like Card) and thus should not be styled. */
  hasEmbeddedContent?: boolean;
}

export type NatuPopoverPlacement = NatuOverlayPlacement;

/**
 * Displays content on an overlay when an element is clicked.
 *
 * Contains all the parts of a popover.
 */
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

/**
 * The element that toggles the popover.
 */
export const NatuPopoverTrigger = forwardRef<HTMLElement, NatuPopoverTriggerProps>(
  function NatuPopoverTrigger(props, forwardedRef) {
    const popover = usePopoverContext();
    const ref = useMergeRefs([popover.referenceRef, forwardedRef]);

    return (
      <Slot ref={ref} {...popover.getReferenceProps(props)}>
        {props.children}
      </Slot>
    );
  },
);

/**
 * The component that pops out when the popover is open.
 */
export const NatuPopoverContent = forwardRef<HTMLDivElement, NatuPopoverContentProps>(
  function NatuPopoverContent(props, forwardedRef) {
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
