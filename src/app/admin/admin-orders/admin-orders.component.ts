import { Component, OnInit } from '@angular/core';
import {OrderService} from "./order.service"
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/shopping-cart/cart.service';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  prodListSub: Subscription;
  orders: Order[]=[];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders();
    this.prodListSub=this.orderService.getOrderUpdateListener().subscribe((orders: Order[])=>{
      this.orders=orders;
    })
  }

}
