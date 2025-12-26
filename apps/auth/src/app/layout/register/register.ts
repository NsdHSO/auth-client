import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Register as RegisterLogic } from './service/register';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers: [RegisterLogic],
})
export class Register {}
