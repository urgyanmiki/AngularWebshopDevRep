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

  

  getOrders(){
    this.http.get<{message: string, orders: any}>("http://localhost:3000/api/orders/getall/all")
    .pipe(map((OrderData)=>{
      return OrderData.orders.map(order=>{
        return{
          _id: order.orderid,
          userid: order.userid,
          username: order.username,
          products: order.products,
          finalamount: order.finalamount

        }
      })
    })).subscribe(transformedOrders=>{
      console.log(transformedOrders)
      this.orders=transformedOrders;
      this.orderUpdated.next([...this.orders]);
  })
}
getOrderUpdateListener(){
  return this.orderUpdated.asObservable();
}

}
