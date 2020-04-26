import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CustomFormsModule} from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthIntercepter } from './login/auth-intercepter';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'check-out', component: CheckOutComponent},
      {path: 'order-success', component: OrderSuccessComponent},
      {path: 'login', component: LoginComponent},
      {path: 'admin/products', component: AdminProductsComponent},
      {path: 'admin/orders', component: AdminOrdersComponent},
      {path: 'my/orders', component: MyOrdersComponent},
      {path: 'admin/products/new', component: ProductFormComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'checkout', component: CheckOutComponent}
    ]),
    NgbModule,
    HttpClientModule,
    CustomFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
