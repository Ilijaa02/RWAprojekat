import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../request-list/response.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {
  responses: any[] = [];

  constructor(
    private responseService: ResponseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses() {
    const username = this.authService.getUsername();
    this.responseService.getResponsesForUser(username!).subscribe(
      (responses: any[]) => {
        console.log('Loaded responses:', responses);
        this.responses = responses;
      },
      error => console.error('Error loading responses:', error)
    );
  }
}
