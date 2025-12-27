import { Injectable, signal } from '@angular/core';
import { AuthRequestBody } from '../models/Register.type';
import { email, form, minLength, required, FieldTree } from '@angular/forms/signals';

@Injectable()
export class Register {
  loginModel = signal<AuthRequestBody>({
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
    terms: false,
  });




  loginForm: FieldTree<AuthRequestBody> = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);

    required(schemaPath.password);
    minLength(schemaPath.password, 8);

    required(schemaPath.terms);
  });
}
