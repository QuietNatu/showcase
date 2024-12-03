import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NatuCounterComponent } from '@natu/ui-angular';

/**
 * Displays a counter.
 */
@Component({
  selector: 'app-counter',
  template: `<natu-counter />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NatuCounterComponent],
})
export class CounterComponent {}
