import { InjectionToken } from '@angular/core';

export const REMOTE_LOGIN = new InjectionToken('REMOTE_LOGIN', {
  factory: () => ({
    baseUrl: process.env['REMOTE_URL'] + '/v1/auth/login',
  }),
});

