import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../request-list/response.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-received-responses',
  templateUrl: './received-responses.component.html',
  styleUrls: ['./received-responses.component.scss']
})
export class ReceivedResponsesComponent implements OnInit {
  responses: any[] = [];

  constructor(
    private responseService: ResponseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses(): void {
    const username = this.authService.getUsername();

    if (username) {
      this.responseService.getReceivedResponses(username).subscribe(
        data => {
          this.responses = data;
        },
        error => {
          console.error('Error loading responses:', error);
        }
      );
    } else {
      console.error('Username is null. Cannot fetch responses.');
    }
  }
}
