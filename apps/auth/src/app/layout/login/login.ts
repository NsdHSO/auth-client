import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
} from '@angular/forms';
import { EventBuss, ActionType } from '@auth/eventBuss';
import { LoginService } from '@auth/login';
import { Loading } from '@auth/loading';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Loading, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  /**
   * Event Buss
   * This service handles the event bus logic, allowing components to communicate
   * by emitting and subscribing to events.
   * It uses a Subject to manage the event stream and provides an observable for subscribers.
   */
  eventBuss = inject(EventBuss);

  loginService = inject(LoginService);

  /**
   * Handles form submission.
   * Validates the form and submits the user data to the login service.
   */
  onSubmit(): void {
    if (this.loginService.loginForm.valid) {
      const user = this.loginService.loginForm.value;
      this.loginService.loading = true; // Set loading state to true
      this.eventBuss.emit({
        type: ActionType.LOGIN,
        payload: user,
      });
    }
  }
}

