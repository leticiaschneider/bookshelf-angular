import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiKey = environment.googleBooksApiKey;
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any> {
    this.searchQuerySubject.next(query); // Atualiza a palavra pesquisada
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