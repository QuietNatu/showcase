import {
  ApplicationRef,
  ComponentFactoryResolver,
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
/* TODO: directive? */

@Injectable()
export class NatuPortalService {
  private readonly document = inject(DOCUMENT);
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);

  private readonly portalOutlet = new DomPortalOutlet(
    this.document.body,
    this.componentFactoryResolver,
    this.applicationRef,
    this.injector,
  );

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

  private registerManagePortal() {
    effect((onCleanup) => {
      const content = this.content$();

      if (!content) {
        return;
      }

      const portal = new ComponentPortal(NatuPortalComponent);
      const componentRef = this.portalOutlet.attach(portal);

      componentRef.setInput('content', content);

      onCleanup(() => {
        this.portalOutlet.detach();
      });
    });
  }
}
