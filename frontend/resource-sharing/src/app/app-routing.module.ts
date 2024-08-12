import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/components/login.component';
import { RegisterComponent } from '../app/auth/components/register.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'add-resource', component: AddResourceComponent },
  { path: 'edit-resource/:id', component: EditResourceComponent },
  { path: '', redirectTo: '/resources', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
