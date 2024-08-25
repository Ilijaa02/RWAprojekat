import { Store } from '@ngrx/store';
import { AppState } from '../resources/store/app.state';
import * as ResourcesActions from '../resources/store/resources.actions';
import * as ResourcesSelectors from '../resources/store/resources.selectors';
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
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ResourcesActions.loadResources());
    this.store.select(ResourcesSelectors.selectAll).subscribe(resources => {
      this.resources = resources;
      this.filteredResources = resources;
    });
    this.userRole = this.authService.getUserRole();
  }

  loadResources() {
    this.store.dispatch(ResourcesActions.loadResources());
  }

  deleteResource(resourceId?: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj resurs?')) {
      this.store.dispatch(ResourcesActions.deleteResource({ resourceId: resourceId! }));
    }
  }

  filterResourcesByType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const type = selectElement.value as ResourceType;

    if (type) {
      this.store.dispatch(ResourcesActions.filterResourcesByType({ resourceType: type }));
    } else {
      this.store.select(ResourcesSelectors.selectAll).subscribe(resources => {
        this.filteredResources = resources;
      });
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
