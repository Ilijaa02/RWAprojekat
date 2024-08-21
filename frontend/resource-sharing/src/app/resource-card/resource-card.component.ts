import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from '../resources/resources.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent {
  constructor(private authService: AuthService) { }

  @Input() resource!: Resource;
  @Input() userRole!: string | null;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() request = new EventEmitter<number>();

  isResourceOwner(): boolean {
    const currentUser = this.authService.getUsername();
    return this.resource.user.username === currentUser;
  }

}
