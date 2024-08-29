import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NatuTranslationDirective } from '@natu/ui-angular';

/* TODO: can robots.txt be in public folder? */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CounterComponent, HeaderComponent, SidebarComponent, NatuTranslationDirective],
})
export class AppComponent {}
