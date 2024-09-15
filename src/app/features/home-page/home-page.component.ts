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

  dropdownOpen = false;
  dropdownOptions = ['Read', 'Reading', 'Want to Read', 'Rereading', 'Abandoned', 'Wishlist'];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.categories.forEach((category) => {
      this.bookService.getBooks(category.query).subscribe((data: any) => {
        this.booksByCategory[category.name] = data.items || [];
      });
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
    document.addEventListener('click', this.closeDropdown);
  }

  closeDropdown = () => {
    this.dropdownOpen = false;
    document.removeEventListener('click', this.closeDropdown);
  }

  selectOption(option: string) {
    console.log('Selected:', option);
    this.dropdownOpen = false;
  }
}
