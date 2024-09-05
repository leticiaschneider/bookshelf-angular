import { Component } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
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