import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { AdminGuard } from './login/adminguard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';


const routes: Routes = [
  {path: "my/orders", component:MyOrdersComponent, canActivate: [AuthGuard] },
  {path: "admin/orders", component: AdminOrdersComponent,canActivate: [AdminGuard]},
  {path: "admin/products", component: AdminProductsComponent, canActivate:[AdminGuard]},
  {path: "admin/products/new", component: ProductFormComponent, canActivate: [AdminGuard]},
  {path: "checkout", component: CheckOutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,AdminGuard]
})
export class AppRoutingModule { }
