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
import { NatuTooltipReferenceDirective } from './tooltip-reference.directive';

const defaultHoverDelay = 500;

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService, NatuTooltipService],
})
export class NatuTooltipDirective implements OnDestroy {
  // Should be required but cannot because of https://github.com/angular/angular/issues/50510
  /** Content that will be shown by the tooltip. */
  @Input({ alias: 'natuTooltip' }) set content(
    content: string | TemplateRef<unknown> | null | undefined,
  ) {
    this.tooltipService.setContent(content ?? '');
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

  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);
  private readonly tooltipService = inject(NatuTooltipService);
  private readonly uiConfig = inject(NATU_UI_CONFIG, { optional: true });

  private readonly childReferenceRef = contentChild(NatuTooltipReferenceDirective, {
    read: ElementRef,
  });
  private readonly referenceRef = computed(() => this.childReferenceRef() ?? this.elementRef);

  constructor() {
    this.overlayService.setHasTransitions(true);

    useOverlayHover({ delay: this.uiConfig?.tooltip?.hoverDelay ?? defaultHoverDelay });
    useOverlayFocus();
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
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
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
        if (this.overlayService.isMounted$()) {
          this.renderer.setAttribute(
            referenceRef.nativeElement,
            'aria-describedby',
            `tooltip-${this.overlayService.floatingId}`,
          );
        } else {
          this.renderer.removeAttribute(referenceRef.nativeElement, 'aria-describedby');
        }
      }
    });
  }
}

export const natuTooltipImports = [NatuTooltipDirective, NatuTooltipReferenceDirective] as const;
