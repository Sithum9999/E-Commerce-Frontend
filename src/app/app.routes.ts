import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [{
    path:"",
    component:DashboardComponent,
    children:[{
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:RegisterComponent
    },
    {
        path:"order",
        component:RegisterComponent
    }]
},
{
    path: '',
    component: DashboardComponent, 
    children: [
      {
        path: "admin/dashboard",
        loadComponent: () =>
          import('./admin/component/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },{
        path: "customer/dashboard",
        loadComponent: () =>
          import('./customer/component/dashboard/dashboard.component').then(m => m.DashboardComponent),
      }]
    }

];
