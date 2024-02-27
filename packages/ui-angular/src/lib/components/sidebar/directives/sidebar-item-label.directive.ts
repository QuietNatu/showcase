import { Directive } from '@angular/core';

@Directive({
  selector: '[natuSidebarItemLabel]',
  standalone: true,
  host: {
    class: 'sidebar__item-label',
  },
})
export class NatuSidebarItemLabelDirective {}
