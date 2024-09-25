import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-library.component.html',
  styleUrl: './my-library.component.scss'
})
export class MyLibraryComponent implements OnInit {
  selectedOption: string = 'All';
  dropdownOptions: string[] = ['All', 'Read', 'Reading', 'Want to Read', 'Rereading', 'Abandoned'];

  bookList: any[] = [];

  ngOnInit(): void {
    this.loadStoredBooks();
  }

  loadStoredBooks() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedBooks = localStorage.getItem('storedBooks');
      if (storedBooks) {
        this.bookList = JSON.parse(storedBooks);
        this.bookList.forEach(book => console.log('Book: ', book));
      }
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}