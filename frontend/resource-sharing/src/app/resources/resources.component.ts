import { Component, OnInit } from '@angular/core';
import { Resource, ResourceService, ResourceType } from '../resources/resources.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { combineLatest, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  userRole: string | null = null;
  filteredResources: Resource[] = [];
  selectedType: ResourceType | '' = '';

  constructor(
    private resourceService: ResourceService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadResources();
    this.userRole = this.authService.getUserRole();
  }

  loadResources() {
    const allResources$ = this.resourceService.getAllResources().pipe(
      startWith([])
    );
    const filteredResources$ = of(this.selectedType).pipe(
      switchMap(type =>
        type ? this.resourceService.getResourcesByType(type) : allResources$
      ),
      startWith([])
    );
    combineLatest([allResources$, filteredResources$]).pipe(
      map(([allResources, filteredResources]) => {
        this.resources = allResources;
        this.filteredResources = filteredResources;
      })
    ).subscribe();
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
    this.selectedType = selectElement.value as ResourceType;

    this.loadResources();
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
