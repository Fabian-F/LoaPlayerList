import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailControl = new FormControl();
  passwordControl = new FormControl();
  authService = inject(AuthService);

  onLogin() {
    const email = this.emailControl.value;
    const password = this.passwordControl.value;
    this.authService.login(email, password);
  }
}
