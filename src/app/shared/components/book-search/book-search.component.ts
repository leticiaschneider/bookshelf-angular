import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  books: any[] = [];
  query: string = '';

  constructor(private bookService: BookService) { }

  search(): void {
    this.bookService.searchBooks(this.query).subscribe((data: any) => {
      this.books = data.items;
      console.log(data.items);
    });
  }
}
