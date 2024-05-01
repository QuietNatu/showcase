import { Directive, EventEmitter, Input, Output, booleanAttribute, inject } from '@angular/core';
import { NatuDisclosureService } from './disclosure.service';
import { registerEffect } from '../../utils/rxjs';
import { NatuDisclosureTriggerDirective } from './disclosure-trigger.directive';
import { NatuDisclosureContentDirective } from './disclosure-content.directive';

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
  @Input({ alias: 'natuDisclosureIsExpanded' }) set isExpanded(
    isExpanded: boolean | null | undefined,
  ) {
    this.disclosureService.setIsExpanded(isExpanded ?? undefined);
  }

  /** Default value for uncontrolled expanded state. */
  @Input({ alias: 'natuDisclosureDefaultIsExpanded' }) set defaultIsExpanded(
    defaultIsExpanded: boolean | null | undefined,
  ) {
    this.disclosureService.setDefaultIsExpanded(defaultIsExpanded ?? undefined);
  }

  /** Whether the disclosure should be disabled. */
  @Input({ alias: 'natuDisclosureIsDisabled', transform: booleanAttribute }) set isDisabled(
    isDisabled: boolean,
  ) {
    this.disclosureService.isDisabled$.set(isDisabled);
  }

  /** Controlled expanded state event emitter. */
  @Output('natuDisclosureIsExpandedChange') isExpandedChange = new EventEmitter<boolean>();

  private readonly disclosureService = inject(NatuDisclosureService);

  constructor() {
    registerEffect(this.disclosureService.isExpandedChange$, (isExpanded) => {
      this.isExpandedChange.emit(isExpanded);
    });
  }
}

export const natuDisclosureImports = [
  NatuDisclosureDirective,
  NatuDisclosureTriggerDirective,
  NatuDisclosureContentDirective,
] as const;
