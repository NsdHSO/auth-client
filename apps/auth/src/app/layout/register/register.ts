import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Register as RegisterLogic } from './service/register';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [RouterLink, Field],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers: [RegisterLogic],
})
export class Register {
  protected registerService = inject(RegisterLogic);
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerService.loginForm().valid()) {
      console.log('Form Data:', this.registerService.loginForm().value());
    }
  }
}
