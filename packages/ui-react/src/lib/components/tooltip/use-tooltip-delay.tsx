import { useNatuUiConfig } from '../../contexts';

const defaultHoverDelay = 500;

/**
 * Provides the delay used by tooltips, by default.
 */
export function useTooltipDelay(): number {
  const { tooltip: tooltipConfig } = useNatuUiConfig();
  return tooltipConfig?.hoverDelay ?? defaultHoverDelay;
}
