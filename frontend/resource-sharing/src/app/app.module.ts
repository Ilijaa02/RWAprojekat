import { isDevMode, NgModule } from '@angular/core';
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
import { CreateRequestComponent } from './create-request/create-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestListComponent } from './request-list/request-list.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { ReceivedResponsesComponent } from './received-responses/received-responses.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { resourcesReducer } from './resources/store/resources.reducer';
import * as effects from './resources/store/resources.effects';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsService } from './accounts/accounts.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResourcesComponent,
    AddResourceComponent,
    EditResourceComponent,
    CreateRequestComponent,
    RequestListComponent,
    MyRequestsComponent,
    ResponseListComponent,
    ReceivedResponsesComponent,
    ResourceCardComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ resources: resourcesReducer }, {}),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: !isDevMode() }),
  ],
  providers: [
    AuthService,
    ResourceService,
    AccountsService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
