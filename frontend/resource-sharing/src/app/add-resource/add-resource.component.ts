import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService, ResourceType } from '../resources/resources.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent {

  resourceData = { name: '', description: '', type: ResourceType.PREDMET };

  constructor(private resourceService: ResourceService, private router: Router) { }

  addResource() {
    this.resourceService.createResource(this.resourceData).subscribe(
      () => {
        console.log('Resource added');
        this.router.navigate(['/resources']);
      },
      (error) => {
        console.error('Error adding resource', error);
      }
    );
  }
}
