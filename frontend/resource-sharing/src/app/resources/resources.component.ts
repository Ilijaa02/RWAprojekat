import { Component, OnInit } from '@angular/core';
import { Resource, ResourceType } from '../resources/resources.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../resources/store/app.state';
import { loadResources, deleteResource, filterResourcesByType, loadSortedResourcesByRating } from '../resources/store/resources.actions';
import { selectFilteredResources, selectAllResources, selectSortedResourcesByRating } from '../resources/store/resources.selectors';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources$: Observable<Resource[]>;
  filteredResources$: Observable<Resource[]>;
  userRole: string | null = null;
  selectedType: ResourceType | '' = '';

  private searchName$ = new Subject<string>();
  private searchOwner$ = new Subject<string>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) {
    this.resources$ = this.store.select(selectAllResources);
    this.filteredResources$ = combineLatest([
      this.resources$,
      this.searchName$.pipe(startWith('')),
      this.searchOwner$.pipe(startWith('')),
      this.store.select(selectFilteredResources, { type: this.selectedType })
    ]).pipe(
      map(([resources, name, owner]) =>
        resources.filter(resource =>
          resource.name.toLowerCase().includes(name.toLowerCase()) &&
          resource.user.username.toLowerCase().includes(owner.toLowerCase())
        )
      )
    );
  }

  ngOnInit(): void {
    this.loadResources();
    this.userRole = this.authService.getUserRole();
  }

  loadResources() {
    this.store.dispatch(loadResources());
  }

  deleteResource(resourceId?: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj resurs?')) {
      this.store.dispatch(deleteResource({ resourceId: resourceId! }));
    }
  }

  filterResourcesByType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value as ResourceType;

    this.store.dispatch(filterResourcesByType({ resourceType: this.selectedType }));
    this.filteredResources$ = this.store.select(selectFilteredResources, { type: this.selectedType });
  }

  sortResourcesByRating() {
    console.log("Sort by rating clicked");
    this.store.dispatch(loadSortedResourcesByRating());
    this.resources$ = this.store.select(selectSortedResourcesByRating);
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

  onSearchNameChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchName$.next(inputElement.value);
  }

  onSearchOwnerChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchOwner$.next(inputElement.value);
  }
}
