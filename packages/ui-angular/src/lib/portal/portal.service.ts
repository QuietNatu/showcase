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

type Content = TemplateRef<unknown> | ComponentType<unknown>;

/* TODO: create portal service tests */

/**
 * Creates a portal that attaches content directly into the documents body.
 *
 * Useful for overlays like tooltips.
 *
 * Nested portals will also be nested in the DOM, for easiear overlay dismissal handling.
 */
@Injectable()
export class NatuPortalService {
  /** *Internal* - The content to be renderer by the portal. */
  readonly content$;
  /** *Internal* - The instance of the created portal element. */
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

  private readonly contentSignal$ = signal<Content | null>(null);
  private readonly portalElementRef$ = signal<ElementRef<HTMLElement> | null>(null);

  constructor() {
    this.content$ = this.contentSignal$.asReadonly();
    this.portalElement$ = computed(() => this.portalElementRef$()?.nativeElement ?? null);

    this.registerManagePortal();
  }

  /** Attaches template to a portal. */
  attachTemplate(content: TemplateRef<unknown>) {
    this.contentSignal$.set(content);
  }

  /** Attaches component to a portal.*/
  attachComponent(content: ComponentType<unknown>) {
    this.contentSignal$.set(content);
  }

  /** Detaches content from the portal. */
  detach() {
    this.contentSignal$.set(null);
  }

  private registerManagePortal() {
    effect((onCleanup) => {
      const content = this.contentSignal$();

      if (!content) {
        return;
      }

      const portal = new ComponentPortal(NatuPortalComponent);
      const componentRef = this.portalOutlet.attach(portal);
      untracked(() => this.portalElementRef$.set(componentRef.injector.get(ElementRef)));

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
