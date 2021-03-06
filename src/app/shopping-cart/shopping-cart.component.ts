import { Component, OnInit } from '@angular/core';
import { CartService } from "./cart.service";
import { Subscriber, Subscription } from 'rxjs';
import { Order } from "src/app/models/order.model";
import { LoginService } from '../login/login.service';
import { ThrowStmt } from '@angular/compiler';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  products=[];
  price: number;
  product=[]
  eachprice=[];
  
  constructor(
    public cartService: CartService,
    private loginservice: LoginService) {
  }

  onDelete(){
    console.log("did")
    this.cartService.deleteFinalAmount();
    this.cartService.deleteProductName();
    this.ngOnInit();
  }

 

  manipulateNames(){
    const temp =this.cartService.getProductName()
    this.product=temp.split(",")
    console.log(this.product);
    return this.product;
  }
  

  ngOnInit() {
    this.price=this.cartService.getFinalprice();
    if(this.price){
      this.products=this.manipulateNames();
    
    }
    
  }
}
