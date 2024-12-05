import {
  ElementRef,
  Injectable,
  Signal,
  TemplateRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NatuOverlayService } from '../../overlay';

/**
 * Provides data to the popover overlay.
 */
@Injectable()
export class NatuPopoverService {
  readonly attributes: Signal<Record<string, string>>;
  readonly content: Signal<TemplateRef<unknown> | null>;
  readonly hasEmbeddedContent: Signal<boolean>;
  readonly labelId: Signal<string | null>;
  readonly descriptionId: Signal<string | null>;

  readonly floatingId: string;
  readonly isMounted: Signal<boolean>;

  private readonly attributesSignal = signal<Record<string, string>>({});
  private readonly contentSignal = signal<TemplateRef<unknown> | null>(null);
  private readonly hasEmbeddedContentSignal = signal<boolean>(false);
  private readonly labelIdSignal = signal<string | null>(null);
  private readonly descriptionIdSignal = signal<string | null>(null);

  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.attributes = this.getAttributes();
    this.content = this.contentSignal.asReadonly();
    this.hasEmbeddedContent = this.hasEmbeddedContentSignal.asReadonly();
    this.labelId = this.getLabelId();
    this.descriptionId = this.getDescriptionId();

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

  private getAttributes() {
    return computed(() => {
      // Remove attributes that will conflict with existing code
      const {
        'aria-labelledby': labelledby,
        'aria-describedby': describedby,
        ...attributes
      } = this.attributesSignal();

      return attributes;
    });
  }

  private getLabelId() {
    return computed(
      () => this.labelIdSignal() ?? this.attributesSignal()['aria-labelledby'] ?? null,
    );
  }

  private getDescriptionId() {
    return computed(
      () => this.descriptionIdSignal() ?? this.attributesSignal()['aria-describedby'] ?? null,
    );
  }
}
