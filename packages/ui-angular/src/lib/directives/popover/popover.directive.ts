import {
  Directive,
  OnDestroy,
  booleanAttribute,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { NatuPopoverComponent } from './popover.component';
import { NatuOverlayPlacement, NatuOverlayService } from '../../overlay';
import { NatuPortalService } from '../../portal';
import { useOverlayClick, useOverlayDismiss } from '../../overlay/overlay-interactions';
import { NatuPopoverService } from './popover.service';
import { NatuPopoverContentDirective } from './directives/popover-content.directive';
import { NatuPopoverTriggerDirective } from './directives/popover-trigger.directive';
import { NatuPopoverCardDirective } from './directives/popover-card.directive';
import { natuCardImports } from '../../components';
import { NatuPopoverCardHeaderDirective } from './directives/popover-card-header.directive';
import { NatuPopoverCardBodyDirective } from './directives/popover-card-body.directive';
import { connectSignal } from '../../utils';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[natuPopover]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuPopoverService],
})
export class NatuPopoverDirective implements OnDestroy {
  /** Where to place the popover relative to the reference element. */
  readonly placement = input<NatuOverlayPlacement | null | undefined>(undefined, {
    alias: 'natuPopoverPlacement',
  });

  /** Whether the popover should be disabled. */
  readonly isDisabled = input(false, {
    alias: 'natuPopoverIsDisabled',
    transform: booleanAttribute,
  });

  /** Controlled open state. */
  readonly isOpen = input<boolean | null | undefined>(undefined, { alias: 'natuPopoverIsOpen' });

  /** Default value for uncontrolled open state. */
  readonly defaultIsOpen = input<boolean | null | undefined>(undefined, {
    alias: 'natuPopoverDefaultIsOpen',
  });

  readonly attributes = input<Record<string, string>>({}, { alias: 'natuPopoverAttributes' });

  readonly hasEmbeddedContent = input(false, { alias: 'natuPopoverHasEmbeddedContent' });

  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly popoverService = inject(NatuPopoverService);

  /** Controlled open state event emitter. */
  readonly isOpenChange = outputFromObservable(this.overlayService.isOpenChange$, {
    alias: 'natuPopoverIsOpenChange',
  });

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayClick();
    useOverlayDismiss();

    connectSignal(this.placement, (placement) => {
      this.overlayService.setPlacement(placement ?? null);
    });

    connectSignal(this.isDisabled, (isDisabled) => {
      this.overlayService.setIsDisabled(isDisabled);
    });

    connectSignal(this.isOpen, (isOpen) => {
      this.overlayService.setIsOpen(isOpen ?? undefined);
    });

    connectSignal(this.defaultIsOpen, (defaultIsOpen) => {
      this.overlayService.setDefaultIsOpen(defaultIsOpen ?? undefined);
    });

    connectSignal(this.attributes, (attributes) => {
      this.popoverService.setAttributes(attributes);
    });

    connectSignal(this.hasEmbeddedContent, (hasEmbeddedContent) => {
      this.popoverService.setHasEmbeddedContent(hasEmbeddedContent);
    });

    this.registerManageVisibility();
  }

  ngOnDestroy(): void {
    this.portalService.detach();
  }

  private registerManageVisibility() {
    effect(() => {
      if (this.overlayService.isMounted()) {
        untracked(() => {
          this.portalService.attachComponent(NatuPopoverComponent);
        });
      } else {
        untracked(() => {
          this.portalService.detach();
        });
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
