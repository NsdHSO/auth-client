import { InjectionToken } from '@angular/core';

export const REMOTE_REGISTER = new InjectionToken('REMOTE_REGISTER', {
  factory: () => ({
    baseUrl: process.env['REMOTE_URL'] + '/v1/auth/register',
  }),
});

