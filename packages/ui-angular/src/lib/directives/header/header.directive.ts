import { Directive } from '@angular/core';

@Directive({
  selector: 'header[natuHeader]',
  standalone: true,
  host: {
    class: 'natu-header',
  },
})
export class NatuHeaderDirective {}
