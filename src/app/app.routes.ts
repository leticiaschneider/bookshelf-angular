import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Se precisar de redirecionamento ao inicial
    { path: 'home', component: HomePageComponent },
    { path: '**', redirectTo: '/home' }
];
