import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from './create-request/request.service';
import { ResponseService } from './request-list/response.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resource-sharing';
  menuOpen = false;
  userRole: string | null = null;
  unreadRequestCount: number = 0;
  unreadResponseCount: number = 0;

  constructor(public authService: AuthService, private router: Router, private requestService: RequestService, private responseService: ResponseService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadUnreadRequests();
    this.loadUnreadResponses();
  }

  logout() {
    this.authService.logout();
    this.userRole = null;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  loadUnreadRequests() {
    if (this.authService.isLoggedIn()) {
      const username = this.authService.getUsername();
      if (username) {
        this.requestService.getUnreadCount(username).subscribe(count => {
          this.unreadRequestCount = count;
        });
      }
    }
  }

  loadUnreadResponses() {
    if (this.authService.isLoggedIn()) {
      const username = this.authService.getUsername();
      if (username) {
        this.responseService.getUnreadCount(username).subscribe(count => {
          this.unreadResponseCount = count;
        });
      }
    }
  }

}
