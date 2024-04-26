import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
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
import { NatuPopoverContentDirective } from './directives/popover-content.directive';
import { NatuPopoverTriggerDirective } from './directives/popover-trigger.directive';
import { NatuPopoverCardDirective } from './directives/popover-card.directive';
import { natuCardImports } from '../../components';
import { NatuPopoverCardHeaderDirective } from './directives/popover-card-header.directive';
import { NatuPopoverCardBodyDirective } from './directives/popover-card-body.directive';

@Directive({
  selector: '[natuPopover]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuPopoverService],
})
export class NatuPopoverDirective implements OnDestroy {
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

  @Input({ alias: 'natuPopoverAttributes' }) set attributes(attributes: Record<string, string>) {
    this.popoverService.setAttributes(attributes);
  }

  @Input({ alias: 'natuPopoverHasEmbeddedContent' }) set hasEmbeddedContent(
    hasEmbeddedContent: boolean,
  ) {
    this.popoverService.setHasEmbeddedContent(hasEmbeddedContent);
  }

  /** Controlled open state event emitter. */
  @Output('natuPopoverIsOpenChange') isOpenChange = new EventEmitter<boolean>();

  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayClick();
    useOverlayDismiss();

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
}

export const natuPopoverImports = [
  NatuPopoverDirective,
  NatuPopoverTriggerDirective,
  NatuPopoverContentDirective,
] as const;

export const natuCardPopoverImports = [
  NatuPopoverDirective,
  NatuPopoverTriggerDirective,
  NatuPopoverContentDirective,
  NatuPopoverCardDirective,
  NatuPopoverCardHeaderDirective,
  NatuPopoverCardBodyDirective,
  natuCardImports,
] as const;
