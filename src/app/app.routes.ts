import { Routes } from '@angular/router';
import {authGuard} from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'offices',
    loadChildren: () => import('./features/offices/components/offices-list/offices-list.component').then(c => c.OfficesListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/components/home/home.component'),
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
