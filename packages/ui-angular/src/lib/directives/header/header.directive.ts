import { Directive } from '@angular/core';

/**
 * Displays a header.
 */
@Directive({
  selector: 'header[natuHeader]',
  standalone: true,
  host: {
    class: 'natu-header',
  },
})
export class NatuHeaderDirective {}
