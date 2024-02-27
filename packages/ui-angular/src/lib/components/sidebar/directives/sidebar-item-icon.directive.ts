import { Directive } from '@angular/core';

@Directive({
  selector: '[natuSidebarItemIcon]',
  standalone: true,
  host: {
    class: 'sidebar__item-icon',
  },
})
export class NatuSidebarItemIconDirective {}
