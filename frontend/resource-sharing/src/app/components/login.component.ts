import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (submit)="login()">
      <input [(ngModel)]="username" name="username" required>
      <input [(ngModel)]="password" type="password" name="password" required>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Logged in:', response);
      }, error => {
        console.error('Login error:', error);
      });
  }
}
