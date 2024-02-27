import { Directive } from '@angular/core';

@Directive({
  selector: '[natuSidebarGroupIcon]',
  standalone: true,
  host: {
    class: 'sidebar__item-icon',
  },
})
export class NatuSidebarGroupIconDirective {}
