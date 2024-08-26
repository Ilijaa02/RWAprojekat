import { Component, OnInit } from '@angular/core';
import { Resource, ResourceService, ResourceType } from '../resources/resources.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  userRole: string | null = null;
  filteredResources: Resource[] = [];

  constructor(
    private resourceService: ResourceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadResources();
    this.userRole = this.authService.getUserRole();
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(resources => {
      this.resources = resources;
      this.filteredResources = resources;
    });
  }

  deleteResource(resourceId?: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj resurs?')) {
      this.resourceService.deleteResource(resourceId!).subscribe(() => {
        this.loadResources();
      });
    }
  }

  filterResourcesByType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const type = selectElement.value as ResourceType;

    if (type) {
      this.resourceService.getResourcesByType(type).subscribe(resources => {
        this.filteredResources = resources;
      });
    } else {
      this.loadResources();
    }
  }

  navigateToAddResource() {
    this.router.navigate(['/add-resource']);
  }

  navigateToEditResource(resourceId?: number) {
    this.router.navigate([`/edit-resource/${resourceId!}`]);
  }

  navigateToCreateRequest(resourceId?: number) {
    this.router.navigate([`/requests/${resourceId}`]);
  }
}
