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
import { NatuTooltipComponent } from './tooltip.component';
import { NatuOverlayPlacement, NatuOverlayService } from '../../overlay';
import { NatuPortalService } from '../../portal';
import {
  useOverlayDismiss,
  useOverlayFocus,
  useOverlayHover,
} from '../../overlay/overlay-interactions';
import { NATU_UI_CONFIG } from '../../core';
import { registerEffect } from '../../utils/rxjs';
import { NatuTooltipService } from './tooltip.service';
import { NatuTooltipTriggerDirective } from './directives/tooltip-trigger.directive';
import { NatuTooltipContentDirective } from './directives/tooltip-content.directive';

const defaultHoverDelay = 500;

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuTooltipService],
})
export class NatuTooltipDirective implements OnDestroy {
  /** Where to place the tooltip relative to the reference element. */
  @Input({ alias: 'natuTooltipPlacement' }) set placement(
    placement: NatuOverlayPlacement | null | undefined,
  ) {
    this.overlayService.setPlacement(placement ?? null);
  }

  /** Whether the tooltip should be disabled. */
  @Input({ alias: 'natuTooltipIsDisabled' }) set isDisabled(
    isDisabled: boolean | null | undefined,
  ) {
    this.overlayService.setIsDisabled(isDisabled ?? false);
  }

  /** Controlled open state. */
  @Input({ alias: 'natuTooltipIsOpen' }) set isOpen(isOpen: boolean | null | undefined) {
    this.overlayService.setIsOpen(isOpen ?? undefined);
  }

  /** Default value for uncontrolled open state. */
  @Input({ alias: 'natuTooltipDefaultIsOpen' }) set defaultIsOpen(
    defaultIsOpen: boolean | null | undefined,
  ) {
    this.overlayService.setDefaultIsOpen(defaultIsOpen ?? undefined);
  }

  /** Controlled open state event emitter. */
  @Output('natuTooltipIsOpenChange') isOpenChange = new EventEmitter<boolean>();

  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly uiConfig = inject(NATU_UI_CONFIG, { optional: true });

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayHover({ delay: this.uiConfig?.tooltip?.hoverDelay ?? defaultHoverDelay });
    useOverlayFocus();
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
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }
}

export const natuTooltipImports = [
  NatuTooltipDirective,
  NatuTooltipTriggerDirective,
  NatuTooltipContentDirective,
] as const;
