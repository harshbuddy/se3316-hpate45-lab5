import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'; 

import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PolicyComponent } from './policy/policy.component';

//define angular routes to activate components
const routes: Routes = [
  
  {
    path: 'login',
    component: LoginFormComponent
  },

  {
    path: 'register',
    component: RegisterFormComponent
  },
  
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
  {
    path: 'policy',
    component: PolicyComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
