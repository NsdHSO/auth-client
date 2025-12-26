import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { EventBuss } from '@auth/eventBuss';
import { ActionType } from 'packages/utils/eventBuss/src/lib/eventBuss/types/action.type';
import { LoginService } from '@auth/login';
import { Loading } from '@auth/loading';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Loading, RouterLink],
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

