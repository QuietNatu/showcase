import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardBodyComponent } from './components/card-body.component';
import { NatuCardFooterComponent } from './components/card-footer.component';
import { NatuCardHeaderIconDirective } from './directives/card-header-icon.directive';
import { NatuCardService } from './card.service';
import { injectRegisterIcons } from '@natu/assets';
import { xIcon } from '@natu/assets/svg/x';
import { registerEffect } from '../../utils/rxjs';

@Component({
  selector: 'natu-card,[natu-card]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [NatuCardService],
  template: `
    <ng-content select="natu-card-header,[natu-card-header]" />
    <ng-content />
    <ng-content select="natu-card-footer,[natu-card-footer]" />
  `,
  host: {
    class: 'natu-card',
    '[class.natu-card--embedded]': 'isEmbedded',
  },
})
export class NatuCardComponent {
  /**
   * Whether the card is part of another component or not.
   * Will hide borders, box-shadows, etc if true.
   */
  @Input({ transform: booleanAttribute }) isEmbedded = false;

  /** Whether to show the dismissable button or not. */
  @Input({ transform: booleanAttribute }) set isDismissable(isDismissable: boolean) {
    this.cardService.setIsDismissable(isDismissable);
  }

  @Output() dismiss = new EventEmitter<void>();

  private readonly cardService = inject(NatuCardService);

  constructor() {
    injectRegisterIcons([xIcon]);

    registerEffect(this.cardService.dismiss$, () => this.dismiss.emit());
  }
}

export const natuCardImports = [
  NatuCardComponent,
  NatuCardHeaderComponent,
  NatuCardHeaderIconDirective,
  NatuCardBodyComponent,
  NatuCardFooterComponent,
] as const;
