import { inject, Injectable } from '@angular/core';
import { REMOTE_LOGIN } from '../../provider/api.token';
import { Subject } from 'rxjs';
import { User } from '../../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   *
   */  
  remoteLoginUrl  = inject(REMOTE_LOGIN).baseUrl;

  /**
   * Initializes the HttpClient with the remote login URL.
   * This URL is used to make API calls for user authentication.
   */
  httpClient = inject(HttpClient);
  /**
   * Subject to emit user data when the form is submitted.
   * This can be used to notify other components or services about the login event.
   */
  dataSubmited = new Subject<User>();

  /**
   * Submits the login form data to the remote login URL.
   * @param user - The user data to be submitted.
   */
  submit(user: User): void {
    this.httpClient.post<User>(this.remoteLoginUrl, user).subscribe({
      next: (data) => {
        console.log('Login successful', data);
        this.dataSubmited.next(data);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
