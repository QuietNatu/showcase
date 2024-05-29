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

export type NatuPopoverTriggerProps = ComponentPropsWithoutRef<'div'>;

export interface NatuPopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Whether the popover has embedded content (like Card) and thus should not be styled. */
  hasEmbeddedContent?: boolean;
}

export type NatuPopoverPlacement = NatuOverlayPlacement;

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
