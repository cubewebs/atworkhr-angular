import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.ActiveUser;

  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  const userRole = user.role;
  const routePath = state.url;

  if (userRole === 'ADMIN_ROLE') {
    return true;
  }

  if (userRole === 'DOCTOR_ROLE' && (routePath.startsWith('/users') || routePath.startsWith('/offices'))) {
    return true;
  }

  if (userRole === 'USER_ROLE' && routePath.startsWith('/users')) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
