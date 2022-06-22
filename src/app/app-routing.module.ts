import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadRequestComponent } from './error-pages/bad-request/bad-request.component';
import { ShowUserComponent } from './user/show-user/show-user.component';

const routes: Routes = [
  { path: 'show-user', component: ShowUserComponent },
  { path: '400', component: BadRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
