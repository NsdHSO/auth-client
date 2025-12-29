import { inject, Injectable } from '@angular/core';
import { of, Subject, switchMap } from 'rxjs';
import { Action, ActionType } from './types/action.type';
import { LoginService } from '@auth/login';
import { Register as RegisterLogic } from '@auth-client/register';

@Injectable({
  providedIn: 'root',
})
export class EventBuss<T extends Action<T>> {
  private events = new Subject<T>();

  /**
   * Login Service
   * This service handles the event bus logic, allowing components to communicate
   * by emitting and subscribing to events.
   * It uses a Subject to manage the event stream and provides an observable for subscribers.
   */
  private loginService = inject(LoginService);

  /**
   * Login Service
   * This service handles the event bus logic, allowing components to communicate
   * by emitting and subscribing to events.
   * It uses a Subject to manage the event stream and provides an observable for subscribers.
   */
  private registerService = inject(RegisterLogic);

  /**
   * Observable stream of events.
   * Subscribers can listen to this stream to receive events.
   */
  events$ = this.events.asObservable();

  calledEvents$ = this.events.pipe(
    switchMap((event: T) => {
      switch (event.type) {
        case ActionType.LOGIN:
          return this.loginService.submit<typeof event.payload>(event.payload);
        case ActionType.REGISTER:
          return this.registerService.onSubmit(event.payload);
      }
      return of(event);
    }),
  );
  /**
   * Emits an event to all subscribers.
   * @param event The event data to emit.
   */
  emit(event: T): void {
    this.events.next(event);
  }
}
