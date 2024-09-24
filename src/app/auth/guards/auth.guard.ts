import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token') ?? null;
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
