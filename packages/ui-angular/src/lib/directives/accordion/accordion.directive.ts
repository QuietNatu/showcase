import { Directive, EventEmitter, Input, Output, booleanAttribute, inject } from '@angular/core';
import { NatuAccordionService } from './accordion.service';
import { registerEffect } from '../../utils/rxjs';
import { NatuAccordionTriggerDirective } from './accordion-trigger.directive';
import { NatuAccordionContentDirective } from './accordion-content.directive';

/**
 * Contains all the parts of the accordion.
 */
@Directive({
  selector: '[natuAccordion]',
  standalone: true,
  providers: [NatuAccordionService],
})
export class NatuAccordionDirective {
  /** Controlled expanded state. */
  @Input({ alias: 'natuAccordionIsExpanded' }) set isExpanded(
    isExpanded: boolean | null | undefined,
  ) {
    this.accordionService.setIsExpanded(isExpanded ?? undefined);
  }

  /** Default value for uncontrolled expanded state. */
  @Input({ alias: 'natuAccordionDefaultIsExpanded' }) set defaultIsExpanded(
    defaultIsExpanded: boolean | null | undefined,
  ) {
    this.accordionService.setDefaultIsExpanded(defaultIsExpanded ?? undefined);
  }

  /** Whether the accordion should be disabled. */
  @Input({ alias: 'natuAccordionIsDisabled', transform: booleanAttribute }) set isDisabled(
    isDisabled: boolean,
  ) {
    this.accordionService.isDisabled$.set(isDisabled);
  }

  /** Controlled expanded state event emitter. */
  @Output('natuAccordionIsExpandedChange') isExpandedChange = new EventEmitter<boolean>();

  private readonly accordionService = inject(NatuAccordionService);

  constructor() {
    registerEffect(this.accordionService.isExpandedChange$, (isExpanded) => {
      this.isExpandedChange.emit(isExpanded);
    });
  }
}

export const natuAccordionImports = [
  NatuAccordionDirective,
  NatuAccordionTriggerDirective,
  NatuAccordionContentDirective,
] as const;
