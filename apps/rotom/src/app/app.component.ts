import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, RouterOutlet],
})
export class AppComponent {
  readonly count$ = signal(0);

  handleIncrementCount() {
    this.count$.update((count) => count + 1);
  }
}
