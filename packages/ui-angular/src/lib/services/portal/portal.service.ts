import {
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  Injector,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ComponentPortal, ComponentType, DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { NatuPortalComponent } from './portal.component';

/* TODO: add stories */
/* TODO: add directive and move to directives folder? */
/* TODO: documentation */

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

  private portalElementRef: ElementRef<HTMLElement> | null = null;

  constructor() {
    this.registerManagePortal();
  }

  private readonly content$ = signal<ComponentType<unknown> | null>(null);

  attach(content: ComponentType<unknown>) {
    this.content$.set(content);
  }

  detach() {
    this.content$.set(null);
  }

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
        this.portalOutlet.detach();
        this.portalElementRef = null;
      });
    });
  }
}
