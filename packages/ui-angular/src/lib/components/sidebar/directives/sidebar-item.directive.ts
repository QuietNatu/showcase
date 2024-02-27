import { Directive, TemplateRef, contentChildren, inject } from '@angular/core';

/* TODO: rethink this? and merge with group? */
@Directive({
  selector: '[natuSidebarItem]',
  standalone: true,
})
export class NatuSidebarItemDirective {
  readonly templateRef = inject(TemplateRef);
  readonly items = contentChildren(NatuSidebarItemDirective);
}
