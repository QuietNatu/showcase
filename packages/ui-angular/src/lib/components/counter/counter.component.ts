import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Displays a counter.
 */
@Component({
  selector: 'natu-counter',
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class NatuCounterComponent {
  readonly count = signal(0);

  handleIncrementCount() {
    this.count.update((count) => count + 1);
  }
}
