import { Routes} from "@angular/router";

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/components/main-layout/main-layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/user-list/user-list.component').then(c => c.UserListComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/user-edit/user-edit.component').then(c => c.UserEditComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '**',
    loadComponent: () => import('../../features/nopagefound/components/nopagefound/nopagefound.component')
  }
]
