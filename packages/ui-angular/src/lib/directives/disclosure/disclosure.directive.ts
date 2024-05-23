import { Directive, booleanAttribute, inject, input } from '@angular/core';
import { NatuDisclosureService } from './disclosure.service';
import { NatuDisclosureTriggerDirective } from './disclosure-trigger.directive';
import { NatuDisclosureContentDirective } from './disclosure-content.directive';
import { connectSignal } from '../../utils';
import { outputFromObservable } from '@angular/core/rxjs-interop';

/**
 * Contains all the parts of the disclosure.
 */
@Directive({
  selector: '[natuDisclosure]',
  standalone: true,
  providers: [NatuDisclosureService],
})
export class NatuDisclosureDirective {
  /** Controlled expanded state. */
  readonly isExpanded = input<boolean | null | undefined>(undefined, {
    alias: 'natuDisclosureIsExpanded',
  });

  /** Default value for uncontrolled expanded state. */
  readonly defaultIsExpanded = input<boolean | null | undefined>(undefined, {
    alias: 'natuDisclosureDefaultIsExpanded',
  });

  /** Whether the disclosure should be disabled. */
  readonly isDisabled = input(false, {
    alias: 'natuDisclosureIsDisabled',
    transform: booleanAttribute,
  });

  private readonly disclosureService = inject(NatuDisclosureService);

  /** Controlled expanded state event emitter. */
  readonly isExpandedChange = outputFromObservable(this.disclosureService.isExpandedChange$, {
    alias: 'natuDisclosureIsExpandedChange',
  });

  constructor() {
    connectSignal(this.isExpanded, (isExpanded) => {
      this.disclosureService.setIsExpanded(isExpanded ?? undefined);
    });

    connectSignal(this.defaultIsExpanded, (defaultIsExpanded) => {
      this.disclosureService.setDefaultIsExpanded(defaultIsExpanded ?? undefined);
    });

    connectSignal(this.isDisabled, (isDisabled) => {
      this.disclosureService.isDisabled$.set(isDisabled);
    });
  }
}

export const natuDisclosureImports = [
  NatuDisclosureDirective,
  NatuDisclosureTriggerDirective,
  NatuDisclosureContentDirective,
] as const;
