import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NatuCounterComponent } from '@natu/ui-angular';

@Component({
  selector: 'app-counter',
  template: `<natu-counter />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NatuCounterComponent],
})
export class CounterComponent {}
