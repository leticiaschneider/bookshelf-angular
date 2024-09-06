import { Routes } from '@angular/router';
import { BookSearchComponent } from './features/book-search/book-search.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Se precisar de redirecionamento ao inicial
    { path: 'home', component: BookSearchComponent },
    { path: '**', redirectTo: '/home' }
];
