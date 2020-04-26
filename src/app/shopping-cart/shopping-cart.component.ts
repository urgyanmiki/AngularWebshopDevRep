import { Component, OnInit } from '@angular/core';
import { CartService} from "./cart.service";
import { Subscriber, Subscription } from 'rxjs';
import {Order} from "src/app/models/order.model";
import { LoginService } from '../login/login.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private prodListSub: Subscription;
  productname: string;
  price: number;
  order: Order[]=[];

  constructor(private cartService: CartService, private loginservice: LoginService) { }

  checkOut(){

  }

  clearOrder(){

  }

  ngOnInit(){
    this.cartService.getShoppingCart();
    this.prodListSub=this.cartService.getOrderListener().subscribe((order: Order[])=>{
      this.order=order;
    })
  }

}
