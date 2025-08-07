import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
//   const router = inject(Router);

//   let hasToken: boolean = false;

//   // if (localStorage.getItem('token')) {
//   //   hasToken = true;
//   // } else {
//   //   hasToken = false;
//   // }
//   hasToken=false;
//   const allowNavigation = hasToken;
//   return allowNavigation
//     ? true
//     : router.createUrlTree(['/welcomepage']);
// };


export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  let hasToken = false;
  try {
    console.log('raw token:', localStorage.getItem('token'));
    hasToken = !!localStorage.getItem('token');
  } catch (e) {
    console.error('localStorage is unavailable:', e);
  }
  console.log('→ allow?', hasToken);
  return hasToken
    ? true
    : router.createUrlTree(['/welcomepage']);
};


// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const hasToken = !!localStorage.getItem('token');
//   return hasToken
//     ? true
//     : router.createUrlTree(['/welcomepage']);
// };



// import { inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { CanActivateFn, Router, UrlTree } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
//   const router = inject(Router);
//   const platformId = inject(PLATFORM_ID);

//   const hasToken = isPlatformBrowser(platformId) && !!localStorage.getItem('token');

//   return hasToken ? true : router.createUrlTree(['/welcomepage']);
// };
