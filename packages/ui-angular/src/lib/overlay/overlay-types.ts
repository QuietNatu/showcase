export interface NatuDelay {
  open: number;
  close: number;
}

export type NatuDelayInput = number | Partial<NatuDelay> | null | undefined;
