import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./layout/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./layout/register/register').then((c) => c.Register),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
