import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resource-sharing';
  menuOpen = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const isAppInitialized = localStorage.getItem('isAppInitialized');

    if (!isAppInitialized) {
      this.logout();
      localStorage.setItem('isAppInitialized', 'true');
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.authService.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
