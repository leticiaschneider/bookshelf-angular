import { Component } from '@angular/core';
import { BookSearchComponent } from '../book-search/book-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BookSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
