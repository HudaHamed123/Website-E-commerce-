import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'' , component:AuthLayoutComponent,canActivate:[loggedGuard],
      children:[
        {path:'login' ,loadComponent:()=> import("./pages/login/login.component").then((c)=>c.LoginComponent),title:'login'},
        {path: 'register' , loadComponent:()=> import("./pages/register/register.component").then((c)=>c.RegisterComponent),title:'register'},
        {path: 'forgot' , loadComponent:()=> import("./pages/forgot/forgot.component").then((c)=>c.ForgotComponent),title:'forgot'},
       

    ]},
    {path:'',component:BlankLayoutComponent,children:[
        {path:'home',loadComponent:()=> import("./pages/home/home.component").then((c)=>c.HomeComponent),title:'home', canActivate:[authGuard]},
        {path:'cart',loadComponent:()=> import("./pages/cart/cart.component").then((c)=>c.CartComponent),title:'cart'},
        {path:'brands',loadComponent:()=> import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands'},
        {path:'categories',loadComponent:()=> import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'categories'},
        {path:'wishList',loadComponent:()=> import('./pages/wish-list/wish-list.component').then((c)=>c.WishListComponent),title:'wishList'},
        {path:'products',loadComponent:()=> import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products'},
        {path:'checkout/:id',loadComponent:()=> import("./pages/check/check.component").then((c)=>c.CheckComponent),title:'checkout'},
        {path: 'allorders' ,
          loadComponent:()=> import("./pages/allorders/all-orders.component").then((c)=>c.AllOrdersComponent),
          title:'allorders'},
        {path:'details/:id',loadComponent:()=> import("./pages/details/details.component").then((c)=>c.DetailsComponent),title:'checkout'},
        {path:'detailsCategories/:id',loadComponent:()=> import("./pages/details-categories/details-categories.component").then((c)=>c.DetailsCategoriesComponent),title:'detailsCategories'},
        {path:'**',component:NotfoundComponent, title:'notfound'}
    ]}
];
