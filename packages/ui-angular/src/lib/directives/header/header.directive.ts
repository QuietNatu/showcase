import { Directive } from '@angular/core';

@Directive({
  selector: 'header[natu-header]',
  standalone: true,
  host: {
    class: 'natu-header',
  },
})
export class NatuHeaderDirective {}
