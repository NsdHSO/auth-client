import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Field } from '@angular/forms/signals';
import { Register as RegisterLogic } from '@auth-client/register';
import { ActionType, EventBuss } from '@auth/eventBuss';
import { Loading } from '@auth/loading';

@Component({
  selector: 'app-register',
  imports: [RouterLink, Field, Loading],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  /**
   * Event Buss
   * This service handles the event bus logic, allowing components to communicate
   * by emitting and subscribing to events.
   * It uses a Subject to manage the event stream and provides an observable for subscribers.
   */
  eventBuss = inject(EventBuss);
  protected registerService = inject(RegisterLogic);

  /**
   * Handles form submission.
   * Validates the form and submits the user data to the login service.
   */
  onSubmit($event: SubmitEvent): void {
    $event.preventDefault();
    if (this.registerService.loginForm().valid()) {
      this.registerService.loading.set(true); // Set loading state to true
      this.eventBuss.emit({
        type: ActionType.REGISTER,
        payload: this.registerService.loginModel(),
      });
    }
  }
}
