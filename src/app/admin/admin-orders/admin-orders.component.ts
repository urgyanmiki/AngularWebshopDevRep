import { Component, OnInit } from '@angular/core';
import {OrderService} from "./order.service"
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  private prodListSub: Subscription;
  order: Order[]=[];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders()
    this.prodListSub=this.orderService.getOrderUpdateListener().subscribe((order: Order[])=>{
      this.order=order;
    })
  }

}
