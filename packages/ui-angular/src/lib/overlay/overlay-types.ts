export interface NatuOverlayDelay {
  open: number | null;
  close: number | null;
}

export type NatuOverlayDelayInput = number | Partial<NatuOverlayDelay> | null | undefined;
