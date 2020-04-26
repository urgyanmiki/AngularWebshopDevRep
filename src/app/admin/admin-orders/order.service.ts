import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Order} from "src/app/models/order.model";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUpdated = new Subject<Order[]>();  
  private orders: Order[]=[];
  private updatedOrder = new Subject<Order[]>();
  constructor(private http: HttpClient) { }

  getAllOrders(){
    
    this.http
    .get<{message: string; order: any}>("http://localhost:3000/api/order/getall")
    .pipe(map((orderData) => {
      return orderData.order.map(order =>{
        return {
          
          productname: order.productname,
          price: order.price
        };
      });
    })).subscribe(orders =>{
      this.orders = orders;
      this.updatedOrder.next([...this.orders]);
    })

  }

    getOrderUpdateListener(){
      return this.orderUpdated.asObservable();
    }
}
