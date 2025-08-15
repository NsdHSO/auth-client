import { inject, Injectable } from '@angular/core';
import { REMOTE_LOGIN } from '../../provider/api.token';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { User } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { BackendResponse } from '@auth/http-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  fb = inject(FormBuilder);

    loginForm  = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
    
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
  submit<T>(user: T): Observable<BackendResponse<T>> {
    return this.httpClient.post<BackendResponse<T>>(this.remoteLoginUrl, user).pipe(catchError((error) => {
      if (error.status === 401) {
        console.error('Login failed: Unauthorized');
        this.loginForm.get('email')?.setErrors({ unauthorized: true });
      }
      if (error.status === 404) {
        console.error('Login failed: Not Found');
                this.loginForm.get('email')?.setErrors({ notFound: true });
      }
      if (error.status === 400) {
        console.error('Login failed: Bad Request');
      }
      if (error.status === 500) {
        console.error('Login failed: Internal Server Error');
      }

      return throwError(() => new Error('Login failed'));
    }));
  }
}
