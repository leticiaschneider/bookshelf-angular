import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book: any;
  @Input() dropdownOptions: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  dropdownOpen = false;
  selectedOption: string | null = null;

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');
      const savedBook = storedBooks.find((b: any) => b.title === this.book.volumeInfo.title);
      if (savedBook) {
        this.selectedOption = savedBook.status;
      }
    }
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
    this.selectedOption = option;

    const bookData = {
      ...this.book.volumeInfo,
      status: option,
      addedDate: new Date().toISOString()
    };

    let storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');

    const bookIndex = storedBooks.findIndex((b: any) => b.title === this.book.volumeInfo.title);
    if (bookIndex > -1) {
      storedBooks[bookIndex] = bookData;
    } else {
      storedBooks.push(bookData);
    }

    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));

    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }
}