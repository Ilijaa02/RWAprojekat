import { Component, OnInit } from '@angular/core';
import { RequestService } from '../create-request/request.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requestList: any[] = [];

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const username = this.authService.getUsername();
    this.requestService.getRequestsForUser(username!).subscribe(
      (requests: any[]) => {
        console.log('Requests:', requests);
        this.requestList = requests;
      },
      error => console.error('Error loading requests:', error)
    );
  }

  deleteRequest(requestId: number) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(requestId).subscribe(
        () => {
          this.requestList = this.requestList.filter(request => request.id !== requestId);
        },
        error => console.error('Error deleting request:', error)
      );
    }
  }

}
