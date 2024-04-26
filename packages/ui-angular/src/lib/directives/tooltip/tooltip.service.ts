import { ElementRef, Injectable, TemplateRef, inject, signal } from '@angular/core';
import { NatuOverlayService } from '../../overlay';

@Injectable()
export class NatuTooltipService {
  readonly content$;

  readonly floatingId;
  readonly isMounted$;

  private readonly contentSignal$ = signal<TemplateRef<unknown> | null>(null);

  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.content$ = this.contentSignal$.asReadonly();

    this.floatingId = this.overlayService.floatingId;
    this.isMounted$ = this.overlayService.isMounted$;
  }

  setContent(content: TemplateRef<unknown>) {
    this.contentSignal$.set(content);
  }

  setReferenceElement(element: Element | ElementRef<Element> | null) {
    this.overlayService.setReferenceElement(element);
  }
}
