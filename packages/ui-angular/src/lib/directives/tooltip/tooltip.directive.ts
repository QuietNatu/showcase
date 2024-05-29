import {
  Directive,
  Injectable,
  OnDestroy,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
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
import { NatuTooltipService } from './tooltip.service';
import { NatuTooltipTriggerDirective } from './directives/tooltip-trigger.directive';
import { NatuTooltipContentDirective } from './directives/tooltip-content.directive';
import { connectSignal } from '../../utils';
import { outputFromObservable } from '@angular/core/rxjs-interop';

const defaultHoverDelay = 500;

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuTooltipService],
})
export class NatuTooltipDirective implements OnDestroy {
  /** Where to place the tooltip relative to the reference element. */
  readonly placement = input<NatuOverlayPlacement | null | undefined>(undefined, {
    alias: 'natuTooltipPlacement',
  });

  /** Whether the tooltip should be disabled. */
  readonly isDisabled = input(false, {
    alias: 'natuTooltipIsDisabled',
    transform: booleanAttribute,
  });

  /** Controlled open state. */
  readonly isOpen = input<boolean | null | undefined>(undefined, { alias: 'natuTooltipIsOpen' });

  /** Default value for uncontrolled open state. */
  readonly defaultIsOpen = input<boolean | null | undefined>(undefined, {
    alias: 'natuTooltipDefaultIsOpen',
  });

  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly uiConfig = inject(NATU_UI_CONFIG, { optional: true });
  private readonly configService = inject(NatuTooltipDirectiveConfigService, {
    self: true,
    optional: true,
  });

  /** Controlled open state event emitter. */
  readonly isOpenChange = outputFromObservable(this.overlayService.isOpenChange$, {
    alias: 'natuTooltipIsOpenChange',
  });

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayHover({ delay: this.uiConfig?.tooltip?.hoverDelay ?? defaultHoverDelay });
    useOverlayFocus();
    useOverlayDismiss();

    connectSignal(
      computed(() => this.configService?.placement() ?? this.placement() ?? null),
      (placement) => {
        this.overlayService.setPlacement(placement);
      },
    );

    connectSignal(
      computed(() => this.configService?.isDisabled() ?? this.isDisabled()),
      (isDisabled) => {
        this.overlayService.setIsDisabled(isDisabled);
      },
    );

    connectSignal(this.isOpen, (isOpen) => {
      this.overlayService.setIsOpen(isOpen ?? undefined);
    });

    connectSignal(this.defaultIsOpen, (defaultIsOpen) => {
      this.overlayService.setDefaultIsOpen(defaultIsOpen ?? undefined);
    });

    this.registerManageVisibility();
  }

  ngOnDestroy(): void {
    this.portalService.detach();
  }

  private registerManageVisibility() {
    effect(() => {
      if (this.overlayService.isMounted()) {
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }
}

@Injectable()
export class NatuTooltipDirectiveConfigService {
  readonly placement = signal<NatuOverlayPlacement | null | undefined>(undefined);
  readonly isDisabled = signal<boolean | undefined>(undefined);
}

export const natuTooltipImports = [
  NatuTooltipDirective,
  NatuTooltipTriggerDirective,
  NatuTooltipContentDirective,
] as const;
