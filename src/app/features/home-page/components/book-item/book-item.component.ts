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
    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }
}
