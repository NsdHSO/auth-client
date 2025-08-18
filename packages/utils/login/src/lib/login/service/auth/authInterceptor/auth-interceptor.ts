import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../login/login';
function isAuthEndpoint(url: string): boolean {
  return url.includes('/v1/auth/login') || url.includes('/v1/auth/refresh') || url.includes('/v1/auth/logout');
}
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  loginService = inject(LoginService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Outgoing request phase
    if (!isAuthEndpoint(req.url)) {
      const token = this.loginService.accessToken();
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
    }

    // Incoming response phase
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Capture token from common response shapes
          const body: any = event.body || {};
          const token = body?.message?.accessToken || body?.accessToken || body?.token || body?.access_token || null;
          if (isAuthEndpoint(event.url || '') && token) {
            this.loginService.accessToken.set(token);
          }
        }
      })
    );
  }
}
