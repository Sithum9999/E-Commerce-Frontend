import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostCategoryComponent } from './admin/component/post-category/post-category.component';
import { PostProductComponent } from './admin/component/post-product/post-product.component';
import { CartComponent } from './customer/component/cart/cart.component';
import { PostCouponComponent } from './admin/component/post-coupon/post-coupon.component';
import { CouponsComponent } from './admin/component/coupons/coupons.component';
import { OrdersComponent } from './admin/component/orders/orders.component';

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
      },{
        path: "admin/category",
        component: PostCategoryComponent
      },{
        path: "admin/product",
        component: PostProductComponent
      },{
        path: "customer/cart",
        component: CartComponent
      },{
        path: "admin/post-coupon",
        component: PostCouponComponent
      },{
        path: "admin/coupons",
        component: CouponsComponent
      },{
        path: "admin/orders",
        component: OrdersComponent
      }
    
    ]
    }

];
