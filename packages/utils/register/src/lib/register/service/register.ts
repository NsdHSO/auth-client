import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthRequestBody } from '../models/register.type';
import {
  email,
  FieldTree,
  form,
  minLength,
  required,
} from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { REMOTE_REGISTER } from '../provider';
import { catchError, of, tap } from 'rxjs';
import { BackendHttpCode, BackendResponse } from '@auth/http-response';

@Injectable({ providedIn: 'root' })
export class Register {
  /**
   * Initializes the HttpClient with the remote login URL.
   * This URL is used to make API calls for user authentication.
   */
  httpClient = inject(HttpClient);

  /**
   * Register token
   */
  remoteLoginUrl = inject(REMOTE_REGISTER).baseUrl;
  loginModel = signal<AuthRequestBody>({
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
    terms: false,
  });

  loginForm: FieldTree<AuthRequestBody> = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.email);
      email(schemaPath.email);

      required(schemaPath.password);
      minLength(schemaPath.password, 8);

      required(schemaPath.terms);
    },
  );
  loading = signal(false);
  onSubmit(payload: AuthRequestBody | unknown | any) {
    if (payload) {
      this.loading.set(true);
      return this.httpClient.post(this.remoteLoginUrl, payload).pipe(
        tap(() => {
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error(error);
          this.loading.set(false);
          return of({
            message: 'An error occurred during login',
            code: error.status as BackendHttpCode,
          } as BackendResponse<any>);
        }),
      );
    }
    return of('You have not Register');
  }
}
