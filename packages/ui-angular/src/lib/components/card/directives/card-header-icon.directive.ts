import { Directive } from '@angular/core';

@Directive({
  selector: '[natuCardHeaderIcon]',
  standalone: true,
  host: {
    class: 'natu-card__header-icon',
  },
})
export class NatuCardHeaderIconDirective {}
