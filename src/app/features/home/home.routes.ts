import { Routes} from "@angular/router";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main-home-layout/main-home-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/home/home.component'),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '**',
    loadComponent: () => import('../../features/nopagefound/components/nopagefound/nopagefound.component')
  }
]
