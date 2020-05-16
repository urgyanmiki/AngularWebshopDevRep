import { Component, OnInit } from '@angular/core';
import { CartService } from '../shopping-cart/cart.service';
import { Subscription } from 'rxjs';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[]=[];
  orderListSub: Subscription;

  constructor(private cartService: CartService) { }

  

  ngOnInit() {
    this.cartService.getMyOrders();
    this.orderListSub=this.cartService.getOrdersAsListener().subscribe((orders: Order[])=>{
      this.orders=orders
    })
  }

}
