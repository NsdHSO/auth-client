import { inject, Injectable, signal } from '@angular/core';
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

@Injectable()
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

  onSubmit() {
    this.httpClient.post(this.remoteLoginUrl, this.loginForm().value);
  }
}
