import { Routes} from "@angular/router";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/admin/main-layout/main-layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('../../auth/register/register.component')
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
