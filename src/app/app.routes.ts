import { Routes } from '@angular/router';
import {authGuard} from "./auth/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'offices',
    loadChildren: () => import('./features/offices/offices.routes').then(m => m.OFFICES_ROUTES),
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
    // loadComponent: () => import('./features/nopagefound/components/nopagefound/nopagefound.component')
  }
];
