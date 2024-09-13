import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookshelf';
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      
      if (event instanceof NavigationStart) {
        console.log('Navigation started to:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('Navigation ended successfully to:', event.url);
      }

      if (event instanceof NavigationError) {
        console.error('Navigation failed:', event.error);
      }
    });
  }
}