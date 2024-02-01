import {
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  Injector,
  TemplateRef,
  computed,
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
  /** *Internal* - Gets the current instance of the created portal element. */
  readonly portalElement$;

  private readonly document = inject(DOCUMENT);
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly parentPortal = inject(NatuPortalService, { optional: true, skipSelf: true });

  private readonly portalOutlet = new DomPortalOutlet(
    this.parentPortal?.portalElement$() ?? this.document.body,
    this.componentFactoryResolver,
    this.applicationRef,
    this.injector,
  );

  private readonly content$ = signal<TemplateRef<unknown> | ComponentType<unknown> | null>(null);
  private readonly portalElementRef$ = signal<ElementRef<HTMLElement> | null>(null);

  constructor() {
    this.portalElement$ = computed(() => this.portalElementRef$()?.nativeElement ?? null);

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

  private registerManagePortal() {
    effect((onCleanup) => {
      const content = this.content$();

      if (!content) {
        return;
      }

      const portal = new ComponentPortal(NatuPortalComponent);
      const componentRef = this.portalOutlet.attach(portal);
      untracked(() => this.portalElementRef$.set(componentRef.injector.get(ElementRef)));

      componentRef.setInput('content', content);

      onCleanup(() => {
        // Detach is triggering effects in the background
        untracked(() => {
          this.portalOutlet.detach();
          this.portalElementRef$.set(null);
        });
      });
    });
  }
}
