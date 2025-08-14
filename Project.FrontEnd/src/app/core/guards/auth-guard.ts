import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const loggedOut: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return token ? true : router.createUrlTree(['/welcomepage']);
};

export const loggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return token ? router.createUrlTree(['/home']) : true;
};