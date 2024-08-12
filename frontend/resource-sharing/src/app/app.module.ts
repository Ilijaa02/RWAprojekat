import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/components/login.component';
import { RegisterComponent } from './auth/components/register.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceService } from './resources/resources.service';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResourcesComponent,
    AddResourceComponent,
    EditResourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ResourceService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
