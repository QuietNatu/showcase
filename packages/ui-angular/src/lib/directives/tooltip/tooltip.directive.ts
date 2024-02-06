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

const defaultHoverDelay = 500;

/* TODO: test */

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuTooltipService],
  host: {
    '[attr.aria-describedby]': 'floatingId$()',
  },
})
export class NatuTooltipDirective implements OnInit, OnDestroy {
  /** Content that will be shown by the tooltip. */
  @Input({ required: true, alias: 'natuTooltip' }) set content(
    content: string | TemplateRef<unknown>,
  ) {
    this.tooltipService.setContent(content);
  }

  /** Context that will be used by the provided template content. */
  @Input({ alias: 'natuTooltipContext' }) set context(context: object | null | undefined) {
    this.tooltipService.setTemplateContext(context ?? null);
  }

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

  readonly floatingId$;

  private readonly elementRef = inject(ElementRef);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly tooltipService = inject(NatuTooltipService);
  private readonly uiConfig = inject(NATU_UI_CONFIG, { optional: true });

  constructor() {
    this.floatingId$ = computed(() =>
      this.overlayService.isMounted$() ? `tooltip-${this.overlayService.floatingId}` : null,
    );

    useOverlayHover({ delay: this.uiConfig?.tooltip?.hoverDelay ?? defaultHoverDelay });
    useOverlayFocus();
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
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }
}
