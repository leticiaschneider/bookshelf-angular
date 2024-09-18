import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, BookItemComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() categoryName!: string;
  @Input() books: any[] = [];
  @Input() dropdownOptions: string[] = [];
}
