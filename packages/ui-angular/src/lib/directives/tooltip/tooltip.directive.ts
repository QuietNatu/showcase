import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NatuTooltipComponent } from './tooltip.component';
import { NatuOverlayService } from '../../overlay';
import { NatuPortalService } from '../../portal';
import {
  useOverlayDismiss,
  useOverlayFocus,
  useOverlayHover,
} from '../../overlay/overlay-interactions';

const defaultHoverDelay = 500;

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService],
  host: {
    '[attr.aria-describedby]': 'floatingId$()',
  },
})
export class NatuTooltipDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'natuTooltip' }) set content(
    content: string | TemplateRef<unknown>,
  ) {
    this.overlayService.setContent(content);
  }

  @Input({ alias: 'natuTooltipIsDisabled' }) set isDisabled(
    isDisabled: boolean | null | undefined,
  ) {
    this.overlayService.setIsDisabled(isDisabled ?? false);
  }

  readonly floatingId$;

  private readonly elementRef = inject(ElementRef);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.floatingId$ = computed(() =>
      this.overlayService.isMounted$() ? `tooltip-${this.overlayService.floatingId}` : null,
    );

    /* TODO: config service */
    useOverlayHover({ delay: defaultHoverDelay });
    useOverlayFocus();
    useOverlayDismiss();

    this.registerManageVisibility();
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
      const isMounted = this.overlayService.isMounted$();

      if (isMounted) {
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }
}
