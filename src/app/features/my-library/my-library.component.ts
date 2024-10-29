import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguagePipe } from '../../shared/pipes/language.pipe';

@Component({
  selector: 'app-my-library',
  standalone: true,
  imports: [CommonModule, LanguagePipe],
  templateUrl: './my-library.component.html',
  styleUrl: './my-library.component.scss'
})
export class MyLibraryComponent implements OnInit {
  selectedOption: string = 'All';
  dropdownOptions: string[] = ['All', 'Read', 'Reading', 'Want to Read', 'Rereading', 'Abandoned'];

  bookList: any[] = [];
  filteredBookList: any[] = [];
  showModal: boolean = false;
  bookToDelete: any = null;

  ngOnInit(): void {
    this.loadStoredBooks();
  }

  loadStoredBooks() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedBooks = localStorage.getItem('storedBooks');
      if (storedBooks) {
        this.bookList = JSON.parse(storedBooks);
        this.filteredBookList = [...this.bookList];
      }
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;

    if (option === 'All') {
      this.filteredBookList = [...this.bookList];
    } else {
      this.filteredBookList = this.bookList.filter(book => book.status === option);
    }
  }

  openModal(book: any) {
    this.showModal = true;
    this.bookToDelete = book;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteItem() {
    if (this.bookToDelete) {
      this.bookList = this.bookList.filter(book => book.title !== this.bookToDelete.title);
      localStorage.setItem('storedBooks', JSON.stringify(this.bookList));
      console.log('Book deleted:', this.bookToDelete);
    }
    this.closeModal();
  }
}