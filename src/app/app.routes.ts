import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'my-library', loadComponent: () => import('./features/my-library/my-library.component').then(m => m.MyLibraryComponent) },
    { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent) }, 
    { path: '**', redirectTo: '/home' },
];
