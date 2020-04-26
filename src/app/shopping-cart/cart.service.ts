import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {Order} from "src/app/models/order.model";
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { LoginService } from '../login/login.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orders: Order[]=[];
  private updatedOrder = new Subject<Order[]>();
  private orderid: string
  private userid: string;


  constructor(private http: HttpClient, private loginservice: LoginService) { }

  addToCart(productname,price){
    console.log(productname,price)
    const userid = this.loginservice.getUserId();
    console.log(this.userid);
    const orderData = {productname: productname,price: price, userid: userid}
    this.http.post<{productname: string, price: number,id: string,orderid: string
    }>("http://localhost:3000/api/order/new",orderData).subscribe(response=>{
    this.orderid=response.orderid
    console.log(response);
    console.log(this.orderid);
    this.saveOrderId(this.orderid);
    });
  }

  pushToCart(productname,price){
    const userid = this.loginservice.getUserId();
    const orderid = this.getOrderId();
    const orderData = {productname: productname,price: price, orderid: orderid}
    this.http.put<{productname: string, price: number,id: string,orderid: string
    }>("http://localhost:3000/api/order/push:"+orderid,orderData).subscribe(response=>{
    this.orderid=response.orderid
    console.log(response);
    console.log(this.orderid);
    });

  }
  getShoppingCart(){
    const orderid=this.getOrderId();
    console.log(orderid);
    this.http
    .get<{message: string; order: any}>("http://localhost:3000/api/order/"+ orderid)
    .pipe(map((orderData) => {
      return orderData.order.map(order =>{
        return { 
          paid: order.paid,
          userid: order.userid,
          products: order.products,
          productname: order.productname,
          price: order.price     
        };
      });
    })).subscribe(orders =>{
      this.orders = orders;
      this.updatedOrder.next([...this.orders]);
    })

  }

  getOrderListener(){
    return this.updatedOrder.asObservable();
  }

  getOrderId(){
    const orderid = localStorage.getItem("orderid");
    console.log(orderid);
    return(orderid);
  }
  saveOrderId(orderid){
    localStorage.setItem("orderid", orderid);
  }
  deleteOrderId(){
    localStorage.removeItem("orderid");
  }
  destroyOrder(){
    const orderid=this.getOrderId()
    console.log(orderid)
    this.http.delete("http://localhost:3000/api/order/delete"+orderid)
    this.deleteOrderId();
  }
}
