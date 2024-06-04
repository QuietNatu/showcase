import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NatuHeaderDirective } from '@natu/ui-angular';

@Component({
  selector: 'app-header',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  hostDirectives: [NatuHeaderDirective],
  template: `<img src="logo.svg" alt="Rotom" class="header__logo" />`,
})
export class HeaderComponent {}
