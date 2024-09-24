import { Routes} from "@angular/router";

export const OFFICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/components/main-layout/main-layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/offices-list/offices-list.component').then(c => c.OfficesListComponent),
      },
      {
        path: 'edit',
        loadComponent: () => import('./components/add-edit-office/add-edit-office.component').then(c => c.AddEditOfficeComponent)
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
