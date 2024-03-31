import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  computed,
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

@Directive({
  selector: '[natuPopover]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuPopoverService],
  host: {
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'isMounted()',
    '[attr.aria-controls]': 'floatingId()',
  },
})
export class NatuPopoverDirective implements OnInit, OnDestroy {
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

  readonly isMounted;
  readonly floatingId;

  private readonly elementRef = inject(ElementRef);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.isMounted = this.overlayService.isMounted$;
    this.floatingId = computed(() => `popover-${this.overlayService.floatingId}`);

    useOverlayClick();
    useOverlayDismiss();

    this.registerManageVisibility();
    registerEffect(this.overlayService.isOpenChange$, (isOpen) => this.isOpenChange.emit(isOpen));
  }

  ngOnInit(): void {
    this.overlayService.setHasTransitions(true);
    this.overlayService.setReferenceElement(this.elementRef);
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
}
