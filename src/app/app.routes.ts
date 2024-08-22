import { Routes } from '@angular/router';
import {authGuard} from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./users/users.routes').then(m => m.USERS_ROUTES),
  //   canActivate: [authGuard]
  // },
  // {
  //   path: 'hospitals',
  //   loadChildren: () => import('./hospitals/hospitals.routes').then(m => m.HOSPITALS_ROUTES),
  //   canActivate: [authGuard]
  // },
  {
    path: 'home',
    loadComponent: () => import('./features/home/components/home/home.component')
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./features/nopagefound/components/nopagefound/nopagefound.component')
  }
];
