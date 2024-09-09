import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiKey = environment.googleBooksApiKey;
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}&maxResults=10`;
    return this.http.get(url);
  }

  getBookById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}?key=${this.apiKey}`;
    return this.http.get(url);
  }
}