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
  resources: any[] = [];
  userRole: string | null = null;
  filteredResources: Resource[] = [];

  constructor(private resourceService: ResourceService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadResources();
    this.userRole = this.authService.getUserRole();
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(
      (data) => {
        this.resources = data;
        this.filteredResources = data;
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  navigateToAddResource() {
    this.router.navigate(['/add-resource']);
  }

  deleteResource(resourceId?: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj resurs?')) {
      this.resourceService.deleteResource(resourceId!).subscribe(() => {
        this.loadResources();
      });
    }
  }

  isResourceOwner(resource: any): boolean {
    const currentUser = this.authService.getUsername();
    return resource.user.username === currentUser;
  }

  navigateToEditResource(resourceId?: number) {
    this.router.navigate([`/edit-resource/${resourceId!}`]);
  }

  filterResourcesByType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const type = selectElement.value;

    if (type) {
      this.resourceService.getResourcesByType(type as ResourceType).subscribe(
        (data) => {
          this.filteredResources = data;
        },
        (error) => {
          console.error('Error filtering resources', error);
        }
      );
    } else {
      this.filteredResources = this.resources;
    }
  }

  navigateToCreateRequest(resourceId?: number) {
    this.router.navigate([`/requests/${resourceId}`]);
  }

}
