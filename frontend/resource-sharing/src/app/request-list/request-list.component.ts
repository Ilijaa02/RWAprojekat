import { Component, OnInit } from '@angular/core';
import { RequestService } from '../create-request/request.service';
import { AuthService } from '../auth/services/auth.service';
import { ResponseService } from './response.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requestList: any[] = [];

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private responseService: ResponseService
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const username = this.authService.getUsername();
    this.requestService.getRequestsForUser(username!).subscribe(
      (requests: any[]) => {
        this.requestList = requests;
        this.requestList.forEach(request => request.showResponseInput = false);
      },
      error => console.error('Error loading requests:', error)
    );
  }

  toggleResponseInput(requestId: number) {
    const request = this.requestList.find(req => req.id === requestId);
    if (request) {
      request.showResponseInput = !request.showResponseInput;
    }
  }

  submitResponse(requestId: number, message: string) {
    this.responseService.createResponse(requestId, message).subscribe(
      () => {
        const request = this.requestList.find(req => req.id === requestId);
        if (request) {
          request.responseMessage = message;
          request.showResponseInput = false;
        }
      },
      error => console.error('Error submitting response:', error)
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
