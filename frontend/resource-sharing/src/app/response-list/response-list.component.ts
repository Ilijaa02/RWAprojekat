import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../request-list/response.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {
  responses: any[] = [];

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses() {
    this.responseService.getAllResponses().subscribe(
      (responses: any[]) => {
        this.responses = responses;
      },
      error => console.error('Error loading responses:', error)
    );
  }
}
