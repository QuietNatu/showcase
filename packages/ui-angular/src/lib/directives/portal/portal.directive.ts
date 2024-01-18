import { Directive, OnDestroy, OnInit, TemplateRef, inject } from '@angular/core';
import { NatuPortalService } from './portal.service';

/* TODO: docs */

@Directive({
  selector: '[natuPortal]',
  standalone: true,
  providers: [NatuPortalService],
})
export class NatuPortalDirective implements OnInit, OnDestroy {
  private readonly portalService = inject(NatuPortalService);
  private readonly portalTemplate = inject<TemplateRef<unknown>>(TemplateRef);

  ngOnInit(): void {
    this.portalService.attach(this.portalTemplate);
  }

  ngOnDestroy(): void {
    this.portalService.detach();
  }
}
