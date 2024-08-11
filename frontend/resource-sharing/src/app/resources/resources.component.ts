import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resources/resources.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: any[] = [];

  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(
      (data) => {
        this.resources = data;
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  navigateToAddResource() {
    this.router.navigate(['/add-resource']);
  }
}
