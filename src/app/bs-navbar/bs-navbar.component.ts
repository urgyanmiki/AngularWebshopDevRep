import { Component, OnInit, OnDestroy } from '@angular/core';
import { authModel } from 'src/app/models/auth.model';
import { LoginService } from 'src/app/login/login.service';
import { Subscription } from 'rxjs';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;
  userIsAuthenticated = false;
  userIsAdmin = false;
  constructor(private loginservice: LoginService,private cart: CartService ) { }

  onLogout(){
    this.cart.destroyOrder();
    this.loginservice.logout();
    console.log("bye");
    
  }


  ngOnInit() {
    this.userIsAuthenticated=this.loginservice.getIsAuth();
    this.userIsAdmin=this.loginservice.getIsAdmin();
    this.authListenerSubs = this.loginservice.getAuthStatusListener().subscribe(
      isAuthenticated =>{
        this.userIsAuthenticated=isAuthenticated;
      });
      this.adminListenerSubs=this.loginservice.getIsAdminListener().subscribe(
        isAdmin=>{
          this.userIsAdmin=isAdmin;
        }
      );
  }

  ngOnDestroy(){
    this.cart.destroyOrder();
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
    
  }
}
