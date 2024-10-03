import { useCallback } from 'react';
import {
  Side,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { NATU_TIME_ANIMATION_STANDARD } from '@natu/styles';
import { NatuUseOverlayOptions, useOverlay } from '../../hooks/use-overlay';
import { createContext } from '../../utils';

const animationDuration = NATU_TIME_ANIMATION_STANDARD;

const sideTransforms: Record<Side, string> = {
  top: 'translateY(4px)',
  bottom: 'translateY(-4px)',
  left: 'translateX(4px)',
  right: 'translateX(-4px)',
};

/**
 * Managers the popover state.
 */
export function usePopover(options: NatuUseOverlayOptions) {
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

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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

export const [PopoverProvider, usePopoverContext] = createContext<ReturnType<typeof usePopover>>({
  name: 'PopoverContext',
});
