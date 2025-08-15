import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from './service/login/login';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  /**
   * Login Service
   * This service handles the login logic, including API calls and authentication.
   * It uses the FormBuilder to create a reactive form for user input.
   */
  loginService = inject(LoginService);

  ngOnInit(): void {
    console.log(process.env['TEVET_API'] );
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  /**
   * Handles form submission.
   * Validates the form and submits the user data to the login service.   
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      console.log('Form submitted:', user);
      this.loginService.submit(user);
    }
  }
}

