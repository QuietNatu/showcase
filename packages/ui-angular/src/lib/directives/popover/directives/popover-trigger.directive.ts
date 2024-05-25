import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { NatuPopoverService } from '../popover.service';

@Directive({
  selector: '[natuPopoverTrigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popoverService.isMounted()',
    '[attr.aria-controls]': "'popover-' + popoverService.floatingId",
  },
})
export class NatuPopoverTriggerDirective implements OnInit {
  readonly popoverService = inject(NatuPopoverService);

  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  ngOnInit(): void {
    this.popoverService.setReferenceElement(this.elementRef);
  }
}
