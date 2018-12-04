import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'; 

import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowMoreDataComponent } from './show-more-data/show-more-data.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginFormComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
