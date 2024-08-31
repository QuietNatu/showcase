import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NatuTranslationDirective } from '@natu/ui-angular';

/* TODO: can robots.txt be in public folder? */
/* TODO: error boundary? */
/* TODO: loading while app is not ready? (i18n via APP_INITIALIZER -> https://netbasal.com/optimize-user-experience-while-your-angular-app-loads-7e982a67ff1a) */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CounterComponent, HeaderComponent, SidebarComponent, NatuTranslationDirective],
})
export class AppComponent {}
