import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: 'login',
		loadComponent: () => import('./layout/login/login').then((c) => c.Login),
	}
];
