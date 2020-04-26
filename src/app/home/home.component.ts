import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';
import { Product } from "src/app/admin/product-form/product.model";
import {Order} from "src/app/models/order.model";
import { CartService } from "src/app/shopping-cart/cart.service"
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  private prodSub: Subscription;
  order: Order[]=[];
  isexist: boolean= false;
  constructor(public homeService: HomeService,private cartService: CartService) {
   
   }
   addtocart(productname,price){
     console.log(this.isexist)
    if(this.isexist){
       console.log("it is exist")
       this.cartService.pushToCart(productname,price);
    }else{
      this.cartService.addToCart(productname,price);
      this.isexist=true;
      console.log(this.isexist)
    }    
   }
   
  
   filtering(type){
     console.log(type);
     this.homeService.filtering(type);
     
   }
 
  ngOnInit() {
    this.homeService.getProducts();
    this.prodSub = this.homeService.getProductUpdateListener().subscribe((products: Product[]) => {
      this.products = products;
    })
  }

}
