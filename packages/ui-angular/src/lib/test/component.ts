import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * A test component that does not render anything.
 */
@Component({
  selector: 'natu-test',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuTestComponent {}
