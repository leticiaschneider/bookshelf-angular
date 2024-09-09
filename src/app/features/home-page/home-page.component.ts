import { Component } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  categories = [
    { name: 'Romance', query: 'romance' },
    { name: 'Trending Books', query: 'trending' },
    { name: 'Classics', query: 'classic+literature' },
  ];

  booksByCategory: { [key: string]: any[] } = {};

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.categories.forEach((category) => {
      this.bookService.getBooks(category.query).subscribe((data: any) => {
        this.booksByCategory[category.name] = data.items || [];
      });
    });
  }
}
