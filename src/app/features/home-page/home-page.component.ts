import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [CommonModule, HttpClientModule, CategoryListComponent, BookItemComponent],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  categories = [
    { name: 'Romance', query: 'romance' },
    { name: 'Trending Books', query: 'trending' },
    { name: 'Classics', query: 'classic+literature' },
  ];

  booksByCategory: { [key: string]: any[] } = {};

  private searchQuerySubscription: Subscription = new Subscription;
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadStoredBooks();

    this.searchQuerySubscription = this.bookService.searchQuery$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.searchQuery = query;

        if (this.searchQuery) {
          this.bookService.searchBooks(this.searchQuery).subscribe((data: any) => {
            this.searchResults = data.items || [];
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }
  
  loadCategories(): void {
    this.categories.forEach((category) => {
      this.bookService.getBooks(category.query).subscribe((data: any) => {
        this.booksByCategory[category.name] = data.items || [];
      });
    });
  }

  loadStoredBooks(): void {
    if (typeof window !== 'undefined') {
      const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');
      // this.booksByCategory['My Library'] = storedBooks;
    }
  }
}