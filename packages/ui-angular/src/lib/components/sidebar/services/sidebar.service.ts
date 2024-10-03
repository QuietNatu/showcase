import { Injectable, Signal, signal } from '@angular/core';
import { controllableSignal } from '../../../utils';
import { Observable } from 'rxjs';

/**
 * Manages the state of the sidebar.
 */
@Injectable()
export class NatuSidebarService {
  readonly isExpanded: Signal<boolean>;
  readonly isExpandedChange$: Observable<boolean>;

  private readonly controlledIsExpanded = signal<boolean | undefined>(undefined);
  private readonly defaultIsExpanded = signal<boolean | undefined>(undefined);

  private readonly isExpandedManager = controllableSignal<boolean>({
    value: this.controlledIsExpanded,
    defaultValue: this.defaultIsExpanded,
    finalValue: false,
  });

  constructor() {
    this.isExpanded = this.isExpandedManager.value;
    this.isExpandedChange$ = this.isExpandedManager.valueChange$;
  }

  setIsExpanded(isExpanded: boolean | undefined) {
    this.controlledIsExpanded.set(isExpanded);
  }

  setDefaultIsExpanded(defaultIsExpanded: boolean | undefined) {
    this.defaultIsExpanded.set(defaultIsExpanded);
  }

  toggleExpansion() {
    this.isExpandedManager.change(!this.isExpanded());
  }
}
