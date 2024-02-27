import { Directive } from '@angular/core';

@Directive({
  selector: '[natuSidebarGroupLabel]',
  standalone: true,
  host: {
    class: 'sidebar__item-label',
  },
})
export class NatuSidebarGroupLabelDirective {}
