import { Injectable, Signal, signal } from '@angular/core';
import { controllableSignal } from '../../utils';
import { Observable } from 'rxjs';
import { createRandomUUID } from '@natu/utils';

@Injectable()
export class NatuDisclosureService {
  readonly id = `disclosure-${createRandomUUID()}`;

  /** Expanded state. */
  readonly isExpanded: Signal<boolean>;
  /** Expanded state notifier. */
  readonly isExpandedChange$: Observable<boolean>;
  /** Disabled state */
  readonly isDisabled = signal(false);

  private readonly controlledIsExpanded = signal<boolean | undefined>(undefined);
  private readonly defaultIsExpanded = signal<boolean | undefined>(undefined);

  private readonly isExpandedManager = controllableSignal({
    value: this.controlledIsExpanded,
    defaultValue: this.defaultIsExpanded,
    finalValue: false,
  });

  constructor() {
    this.isExpanded = this.isExpandedManager.value;
    this.isExpandedChange$ = this.isExpandedManager.valueChange$;
  }

  /** Controlled expanded state. */
  setIsExpanded(isExpanded: boolean | undefined) {
    this.controlledIsExpanded.set(isExpanded);
  }

  /** Default value for uncontrolled expanded state. */
  setDefaultIsExpanded(defaultIsExpanded: boolean | undefined) {
    this.defaultIsExpanded.set(defaultIsExpanded);
  }

  /** Uncontrolled expanded state change */
  toggleExpansion() {
    this.isExpandedManager.change(!this.isExpanded());
  }
}
