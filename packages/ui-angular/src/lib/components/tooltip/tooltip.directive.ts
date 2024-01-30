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
import { NatuOverlayService } from '../../services';
import { NatuPortalService } from '../../directives';

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
    this.registerManageVisibility();

    setTimeout(() => {
      this.overlayService.setIsOpen(true);
    }, 5000);
  }

  ngOnInit(): void {
    this.overlayService.setReferenceElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.portalService.detach();
  }

  private registerManageVisibility() {
    /* TODO: change to isMounted */
    effect(() => {
      const isOpen = this.overlayService.isOpen$();

      if (isOpen) {
        untracked(() => this.portalService.attachComponent(NatuTooltipComponent));
      } else {
        untracked(() => this.portalService.detach());
      }
    });
  }
}
