import { ElementRef, Injectable, TemplateRef, inject, signal } from '@angular/core';
import { NatuOverlayService } from '../../overlay';

/**
 * Provides data to the popover overlay.
 */
@Injectable()
export class NatuPopoverService {
  readonly attributes;
  readonly content;
  readonly hasEmbeddedContent;
  readonly labelId;
  readonly descriptionId;

  readonly floatingId;
  readonly isMounted;

  private readonly attributesSignal = signal<Record<string, string>>({});
  private readonly contentSignal = signal<TemplateRef<unknown> | null>(null);
  private readonly hasEmbeddedContentSignal = signal<boolean>(false);
  private readonly labelIdSignal = signal<string | null>(null);
  private readonly descriptionIdSignal = signal<string | null>(null);

  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.attributes = this.attributesSignal.asReadonly();
    this.content = this.contentSignal.asReadonly();
    this.hasEmbeddedContent = this.hasEmbeddedContentSignal.asReadonly();
    this.labelId = this.labelIdSignal.asReadonly();
    this.descriptionId = this.descriptionIdSignal.asReadonly();

    this.floatingId = this.overlayService.floatingId;
    this.isMounted = this.overlayService.isMounted;
  }

  setAttributes(attributes: Record<string, string>) {
    this.attributesSignal.set(attributes);
  }

  setContent(content: TemplateRef<unknown> | null) {
    this.contentSignal.set(content);
  }

  setReferenceElement(element: Element | ElementRef<Element> | null) {
    this.overlayService.setReferenceElement(element);
  }

  setHasEmbeddedContent(hasEmbeddedContent: boolean) {
    this.hasEmbeddedContentSignal.set(hasEmbeddedContent);
  }

  setLabelId(id: string | null) {
    this.labelIdSignal.set(id);
  }

  setDescriptionId(id: string | null) {
    this.descriptionIdSignal.set(id);
  }

  dismiss() {
    this.overlayService.changeOpen(false);
  }
}
