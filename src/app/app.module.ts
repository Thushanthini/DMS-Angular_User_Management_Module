import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { UserApiService } from './user-api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ShowUserComponent,
    AddEditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
