import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NatuPopoverComponent } from './popover.component';
import { NatuOverlayPlacement, NatuOverlayService } from '../../overlay';
import { NatuPortalService } from '../../portal';
import { useOverlayClick, useOverlayDismiss } from '../../overlay/overlay-interactions';
import { registerEffect } from '../../utils/rxjs';
import { NatuPopoverService } from './popover.service';
import { NatuPopoverReferenceDirective } from './popover-reference.directive';

@Directive({
  selector: '[natuPopover]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuPopoverService],
})
export class NatuPopoverDirective implements OnDestroy {
  // Should be required but cannot because of https://github.com/angular/angular/issues/50510
  /** Content that will be shown by the popover. */
  @Input({ alias: 'natuPopoverTitle' }) set title(
    title: string | TemplateRef<unknown> | null | undefined,
  ) {
    this.popoverService.setTitle(title ?? '');
  }

  /** Context that will be used by the provided template content. */
  @Input({ alias: 'natuPopoverTitleContext' }) set titleContext(
    context: object | null | undefined,
  ) {
    this.popoverService.setTitleContext(context ?? null);
  }

  // Should be required but cannot because of https://github.com/angular/angular/issues/50510
  /** Content that will be shown by the popover. */
  @Input({ alias: 'natuPopoverContent' }) set content(
    content: string | TemplateRef<unknown> | null | undefined,
  ) {
    this.popoverService.setContent(content ?? '');
  }

  /** Context that will be used by the provided template content. */
  @Input({ alias: 'natuPopoverContentContext' }) set contentContext(
    context: object | null | undefined,
  ) {
    this.popoverService.setContentContext(context ?? null);
  }

  /** Where to place the popover relative to the reference element. */
  @Input({ alias: 'natuPopoverPlacement' }) set placement(
    placement: NatuOverlayPlacement | null | undefined,
  ) {
    this.overlayService.setPlacement(placement ?? null);
  }

  /** Whether the popover should be disabled. */
  @Input({ alias: 'natuPopoverIsDisabled' }) set isDisabled(
    isDisabled: boolean | null | undefined,
  ) {
    this.overlayService.setIsDisabled(isDisabled ?? false);
  }

  /** Controlled open state. */
  @Input({ alias: 'natuPopoverIsOpen' }) set isOpen(isOpen: boolean | null | undefined) {
    this.overlayService.setIsOpen(isOpen ?? undefined);
  }

  /** Default value for uncontrolled open state. */
  @Input({ alias: 'natuPopoverDefaultIsOpen' }) set defaultIsOpen(
    defaultIsOpen: boolean | null | undefined,
  ) {
    this.overlayService.setDefaultIsOpen(defaultIsOpen ?? undefined);
  }

  /** Controlled open state event emitter. */
  @Output('natuPopoverIsOpenChange') isOpenChange = new EventEmitter<boolean>();

  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  private readonly childReferenceRef = contentChild(NatuPopoverReferenceDirective, {
    read: ElementRef,
  });
  private readonly referenceRef = computed(() => this.childReferenceRef() ?? this.elementRef);

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayClick();
    useOverlayDismiss();

    this.registerManageReferenceElement();
    this.registerManageVisibility();
    registerEffect(this.overlayService.isOpenChange$, (isOpen) => this.isOpenChange.emit(isOpen));
  }

  ngOnDestroy(): void {
    this.portalService.detach();
  }

  private registerManageVisibility() {
    effect(() => {
      if (this.overlayService.isMounted$()) {
        untracked(() => this.portalService.attachComponent(NatuPopoverComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }

  private registerManageReferenceElement() {
    effect(() => {
      const referenceRef = this.referenceRef();
      untracked(() => this.overlayService.setReferenceElement(referenceRef));
    });

    effect(() => {
      const referenceRef = this.referenceRef();

      if (referenceRef) {
        this.renderer.setAttribute(referenceRef.nativeElement, 'aria-haspopup', 'dialog');

        this.renderer.setAttribute(
          referenceRef.nativeElement,
          'aria-expanded',
          this.overlayService.isMounted$().toString(),
        );

        this.renderer.setAttribute(
          referenceRef.nativeElement,
          'aria-controls',
          `popover-${this.overlayService.floatingId}`,
        );
      }
    });
  }
}

export const natuPopoverImports = [NatuPopoverDirective, NatuPopoverReferenceDirective] as const;
