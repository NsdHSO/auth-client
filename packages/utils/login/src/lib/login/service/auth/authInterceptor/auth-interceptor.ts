import { inject, Injectable, linkedSignal } from '@angular/core';
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
    const token = linkedSignal(()=> this.loginService.accessToken());
    console.log(token());
    // Outgoing request phase
    if (!isAuthEndpoint(req.url)) {
      const token = this.loginService.accessToken();
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token} `} });
      }
    }

    // Incoming response phase
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Capture token from login response body (adjust if your API uses headers instead)
          if (event.url?.includes('/v1/auth/login') && event.body?.access_token) {
            this.loginService.accessToken.set(event.body.access_token);
          }
          // If you also want to capture from refresh:
          if (event.url?.includes('/v1/auth/refresh') && event.body?.access_token) {
            this.loginService.accessToken.set(event.body.access_token);
          }
        }
      })
    );
  }
}
