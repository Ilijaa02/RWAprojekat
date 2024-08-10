import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resource-sharing';

  constructor(public authService: AuthService) { }

  logout(){
    this.authService.logout();
  }
}