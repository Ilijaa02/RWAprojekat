import { Component, OnInit } from '@angular/core';
import { RequestService } from '../create-request/request.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  myRequests: any[] = [];

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMyRequests();
  }

  loadMyRequests() {
    const username = this.authService.getUsername();
    this.requestService.getRequestsByUser(username!).subscribe(
      (requests: any[]) => {
        console.log('My Requests:', requests);
        this.myRequests = requests;
      },
      error => console.error('Error loading my requests:', error)
    );
  }
}
