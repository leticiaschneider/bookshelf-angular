import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  ngOnInit(): void {
    this.loadWishlistBooks();
  }

  loadWishlistBooks(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedBooks = localStorage.getItem('storedBooks');
      if (storedBooks) {
        const bookList = JSON.parse(storedBooks);
        this.wishlist = bookList.filter((book: any) => book.status === 'Wishlist');
      }
    }
  }

  removeFromWishlist(book: any): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedBooks = localStorage.getItem('storedBooks');
      if (storedBooks) {
        const bookList = JSON.parse(storedBooks);
        const updatedBooks = bookList.filter((b: any) => b.title !== book.title);
        localStorage.setItem('storedBooks', JSON.stringify(updatedBooks));
        this.wishlist = this.wishlist.filter((b: any) => b.title !== book.title);
      }
    }
  }
}
