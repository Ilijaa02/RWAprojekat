import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService, Resource, ResourceType } from '../resources/resources.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {
  resource: Resource = { name: '', description: '', type: ResourceType.PREDMET };

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.resourceService.getResourceById(id).subscribe(
      (data) => {
        this.resource = data;
      },
      (error) => {
        console.error('Error fetching resource', error);
      }
    );
  }

  saveChanges() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.resourceService.updateResource(id, this.resource).subscribe(() => {
      this.router.navigate(['/resources']);
    });
  }
}
