import {
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  Injector,
  TemplateRef,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { ComponentPortal, ComponentType, DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { NatuPortalComponent } from './portal.component';

/**
 * Creates a portal that attaches content directly into the documents body.
 *
 * Useful for overlays like tooltips.
 *
 * Nested portals will also be nested in the DOM, for easiear overlay dismissal handling.
 */
@Injectable()
export class NatuPortalService {
  private readonly document = inject(DOCUMENT);
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly parentPortal = inject(NatuPortalService, { optional: true, skipSelf: true });

  private readonly portalOutlet = new DomPortalOutlet(
    this.parentPortal?.getPortalElement() ?? this.document.body,
    this.componentFactoryResolver,
    this.applicationRef,
    this.injector,
  );

  private readonly content$ = signal<TemplateRef<unknown> | ComponentType<unknown> | null>(null);

  private portalElementRef: ElementRef<HTMLElement> | null = null;

  constructor() {
    this.registerManagePortal();
  }

  /**
   * Attaches template to a portal.
   */
  attachTemplate(content: TemplateRef<unknown>) {
    this.content$.set(content);
  }

  /**
   * Attaches component to a portal.
   */
  attachComponent(content: ComponentType<unknown>) {
    this.content$.set(content);
  }

  /**
   * Detaches content from the portal.
   */
  detach() {
    this.content$.set(null);
  }

  /**
   * *Internal* Gets the current instance of the created portal element.
   */
  getPortalElement() {
    return this.portalElementRef?.nativeElement;
  }

  private registerManagePortal() {
    effect((onCleanup) => {
      const content = this.content$();

      if (!content) {
        return;
      }

      const portal = new ComponentPortal(NatuPortalComponent);
      const componentRef = this.portalOutlet.attach(portal);
      this.portalElementRef = componentRef.injector.get(ElementRef);

      componentRef.setInput('content', content);

      onCleanup(() => {
        // Detach is triggering effects in the background
        untracked(() => this.portalOutlet.detach());
        this.portalElementRef = null;
      });
    });
  }
}
