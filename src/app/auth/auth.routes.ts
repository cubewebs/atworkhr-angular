import { Routes} from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component')
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
