import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardBodyComponent } from './components/card-body.component';
import { NatuCardFooterComponent } from './components/card-footer.component';
import { NatuCardHeaderIconDirective } from './directives/card-header-icon.directive';
import { SvgIconComponent, injectRegisterIcons } from '@natu/assets';
import { xIcon } from '@natu/assets/svg/x';
import { natuButtonImports } from '../../directives';
import { NatuCardService } from './card.service';

/* TODO: add i18n once implemented */

@Component({
  selector: 'natu-card,[natu-card]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, SvgIconComponent],
  providers: [NatuCardService],
  template: `
    <ng-content select="natu-card-header,[natu-card-header]" />
    <ng-content />
    <ng-content select="natu-card-footer,[natu-card-footer]" />

    @if (isDismissable) {
      <button
        type="button"
        natuButton
        [isIconButton]="true"
        [variant]="'ghost'"
        [size]="'small'"
        class="natu-card__dismiss"
        (click)="dismiss.emit()"
      >
        <span class="natu-visually-hidden">Dismiss</span>
        <svg-icon [key]="'x'" aria-hidden="true" />
      </button>
    }
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
  @Input({ transform: booleanAttribute }) isDismissable: boolean = false;

  @Output() dismiss = new EventEmitter<void>();

  constructor() {
    injectRegisterIcons([xIcon]);
  }
}

export const natuCardImports = [
  NatuCardComponent,
  NatuCardHeaderComponent,
  NatuCardHeaderIconDirective,
  NatuCardBodyComponent,
  NatuCardFooterComponent,
] as const;
