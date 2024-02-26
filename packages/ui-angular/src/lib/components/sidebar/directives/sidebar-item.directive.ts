import { Directive, TemplateRef, contentChildren, inject } from '@angular/core';

@Directive({
  selector: '[natuSidebarItem]',
  standalone: true,
})
export class NatuSidebarItemDirective {
  readonly templateRef = inject(TemplateRef);
  readonly items = contentChildren(NatuSidebarItemDirective);
}
