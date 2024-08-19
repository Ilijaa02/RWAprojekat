import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../create-request/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  resourceId!: number;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.requestForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = +params['resourceId'];
      console.log('Resource ID:', this.resourceId);
    });
  }

  submitRequest() {
    if (this.requestForm.valid) {
      const requestPayload = {
        ...this.requestForm.value,
        resourceId: this.resourceId
      };
      console.log('Submitting request with payload:', requestPayload);

      this.requestService.createRequest(requestPayload).subscribe(
        () => this.router.navigate(['/resources']),
        error => console.error('Request submission error:', error)
      );
    }
  }

}
