import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NatuTooltipComponent } from './tooltip.component';
import { NatuOverlayService } from '../../overlay';
import { NatuPortalService } from '../../portal';
import { useOverlayDismiss, useOverlayHover } from '../../overlay/overlay-interactions';

const defaultHoverDelay = 500;

@Directive({
  selector: '[natuTooltip]',
  standalone: true,
  providers: [NatuOverlayService, NatuPortalService],
})
export class NatuTooltipDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'natuTooltip' }) set content(
    content: string | TemplateRef<unknown>,
  ) {
    this.overlayService.setContent(content);
  }

  private readonly elementRef = inject(ElementRef);
  private readonly portalService = inject(NatuPortalService);
  private readonly overlayService = inject(NatuOverlayService);

  constructor() {
    this.overlayService.setHasTransitions(true);

    /* TODO: config service */
    useOverlayHover({ delay: defaultHoverDelay });
    useOverlayDismiss();

    this.registerManageVisibility();
  }

  ngOnInit(): void {
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
