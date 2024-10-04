import { Directive } from '@angular/core';

/**
 * The icon for the card header.
 */
@Directive({
  selector: '[natuCardHeaderIcon]',
  standalone: true,
  host: {
    class: 'natu-card__header-icon',
  },
})
export class NatuCardHeaderIconDirective {}
