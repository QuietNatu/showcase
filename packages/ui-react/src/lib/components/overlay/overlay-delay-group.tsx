import { FloatingDelayGroup } from '@floating-ui/react';
import { ReactNode } from 'react';

interface NatuOverlayDelayGroupProps {
  children?: ReactNode;
  /**
   * The delay to use for the group.
   */
  delay: number | Partial<{ open: number; close: number }>;
}

/**
 * Provides context for a group of floating elements that should share a delay.
 */
export function NatuOverlayDelayGroup(props: NatuOverlayDelayGroupProps) {
  return <FloatingDelayGroup {...props} />;
}
