import { Injectable, signal } from '@angular/core';
import { controllableSignal } from '../../utils';
import { Subject } from 'rxjs';
import { createRandomUUID } from '@natu/utils';

@Injectable()
export class NatuAccordionService {
  readonly id = `accordion-${createRandomUUID()}`;

  /** Expanded state. */
  readonly isExpanded$;
  /** Expanded state notifier. */
  readonly isExpandedChange$ = new Subject<boolean>();
  /** Disabled state */
  readonly isDisabled$ = signal(false);

  private readonly controlledIsExpanded$ = signal<boolean | undefined>(undefined);
  private readonly defaultIsExpanded$ = signal<boolean | undefined>(undefined);

  private readonly isExpandedManager = controllableSignal({
    value$: this.controlledIsExpanded$,
    defaultValue$: this.defaultIsExpanded$,
    finalValue: false,
    onChange: (isExpanded) => this.isExpandedChange$.next(isExpanded),
  });

  constructor() {
    this.isExpanded$ = this.isExpandedManager.value$;
  }

  /** Controlled expanded state. */
  setIsExpanded(isExpanded: boolean | undefined) {
    this.controlledIsExpanded$.set(isExpanded);
  }

  /** Default value for uncontrolled expanded state. */
  setDefaultIsExpanded(defaultIsExpanded: boolean | undefined) {
    this.defaultIsExpanded$.set(defaultIsExpanded);
  }

  /** Uncontrolled expanded state change */
  toggleExpansion() {
    this.isExpandedManager.change(!this.isExpanded$());
  }
}
