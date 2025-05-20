import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/** Only used as placeholder while no other components are created. */
@Component({
  selector: 'natu-example-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button type="button" (click)="handleCounterClick()">count is {{ count() }}</button>`,
})
export class ExampleCounter {
  protected readonly count = signal(0);

  protected handleCounterClick() {
    this.count.update((count) => count + 1);
  }
}
