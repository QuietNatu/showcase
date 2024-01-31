import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'natu-overlay-arrow',
  templateUrl: './overlay-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuOverlayArrowComponent {}
