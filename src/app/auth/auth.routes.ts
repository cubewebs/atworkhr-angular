import { Routes} from "@angular/router";
import {authGuard} from "./guards/auth.guard";

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component'),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
    // loadComponent: () => import('../shared/components/nopagefound/nopagefound.component')
  }
]
