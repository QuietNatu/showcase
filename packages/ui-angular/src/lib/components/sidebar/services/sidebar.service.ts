import { Injectable, signal } from '@angular/core';
import { controllableSignal } from '../../../utils';
import { Subject } from 'rxjs';

@Injectable()
export class NatuSidebarService {
  readonly isExpanded$;
  readonly isExpandedChange$ = new Subject<boolean>();

  private readonly controlledIsExpanded$ = signal<boolean | undefined>(undefined);
  private readonly defaultIsExpanded$ = signal<boolean | undefined>(undefined);

  private readonly isExpandedManager = controllableSignal<boolean>({
    value$: this.controlledIsExpanded$,
    defaultValue$: this.defaultIsExpanded$,
    finalValue: false,
    onChange: (isExpanded) => this.isExpandedChange$.next(isExpanded),
  });

  constructor() {
    this.isExpanded$ = this.isExpandedManager.value$;
  }

  setIsExpanded(isExpanded: boolean | undefined) {
    this.controlledIsExpanded$.set(isExpanded);
  }

  setDefaultIsExpanded(defaultIsExpanded: boolean | undefined) {
    this.defaultIsExpanded$.set(defaultIsExpanded);
  }

  toggleExpansion() {
    this.isExpandedManager.change(!this.isExpanded$());
  }
}
