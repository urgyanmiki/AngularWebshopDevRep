import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from "src/app/models/order.model";
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private updatedOrder = new Subject<Order[]>();
  finalPrice: any
  newprice: any
  finalamount: number;
  
  private orders: Order[]=[];
  private orderUpdated = new Subject<Order[]>();

  products: string;
  productnamesList = new Subject<string>();

  constructor(
    public http: HttpClient,
    private loginservice: LoginService) { }
/*
  addToCart(productname: any, price: number) {
    console.log(productname, price)
    const userid = this.loginservice.getUserId();
    this.setFinalAmount(price);
    this.setProductName(productname)
    const orderData = { productname: productname, price: price, userid: userid }
    this.http.post<{
      productname: string, price: number, id: string, orderid: string
    }>("http://localhost:3000/api/order/new", orderData).subscribe(response => {
      this.orderid = response.orderid
      console.log(response);
      console.log(this.orderid);
      this.saveOrderId(this.orderid);
    });

  }


  pushToCart(productname: any, price: number) {
    const orderid = this.getOrderId();
    this.modifyProductName(productname);
    this.modifyFinalAmount(price);
    console.log(this.finalamount);
    const orderData = { productname: productname, price: price, orderid: orderid }
    this.http.put<{
      productname: string, price: number, id: string, orderid: string
    }>("http://localhost:3000/api/order/push:" + orderid, orderData).subscribe(response => {
      this.orderid = response.orderid
      console.log(response);
      this.getFinalprice();
    });


    console.log('orderid ' + orderData.orderid);
    console.log('price ' + orderData.price);
    console.log('productname ' + orderData.productname);
  }
  */
  getMyOrders() {
    const userid = this.loginservice.getUserId();
    
    this.http.get<{message: string, order: any}>("http://localhost:3000/api/orders/"+userid)
    .pipe(map((orderData)=>{
      return orderData.order.map(orders=>{
        return{
          _id: orders.orderid,
          userid: orders.userid,
          products: orders.products,
          finalamount: orders.finalamount
        }

      })
    })).subscribe(transformedOrders=>{
      this.orders=transformedOrders;
      this.orderUpdated.next([...this.orders]);
    })   
  }

  getOrdersAsListener(){
    return this.orderUpdated.asObservable();
  }

  getMyOrderAsListener(){
    
  }



  AddingtoCart(productname: any, price: number) {
    const ordercheck = this.getProductName();

    if (ordercheck != null) {
      this.modifyProductName(productname);
      this.modifyFinalAmount(price);
      this.modifyEachPrice(price);

    } else {
      this.setProductName(productname);
      this.setFinalAmount(price);
      this.setEachprice(price)

    }

  }

  saveOrder(){
    const userid=this.loginservice.getUserId();
    const username =this.loginservice.getUserName();
    console.log(userid);
    const famount = this.getFinalprice();
    const pnames = this.getProductName();
    
    const order = {userid: userid, finalamount: famount, products: pnames,username:username }
    this.http.post("http://localhost:3000/api/orders/new",order).subscribe(response =>{
      console.log(response);
    })
    this.deleteProductName();
    this.deleteFinalAmount();
  }

  //Each price management

  setEachprice(price){
    localStorage.setItem("Price",price);
  }
  getEachPrice(){
    const price = localStorage.getItem("Price");
    return price;
  }
  modifyEachPrice(price){
    var prices=this.getEachPrice();
    prices=prices+','+price;
    localStorage.setItem("Price",prices);
  }
  deleteEachPrice(){
    localStorage.removeItem("Price");
  }

  //Product name management

  
  setProductName(productname) {
    localStorage.setItem("Productnames", productname);
  }

  getProductName() {
    const products = localStorage.getItem("Productnames")
    return products;
  }

  modifyProductName(productname) {
    var products = this.getProductName();
    products = products + ', ' + productname;
    localStorage.setItem("Productnames", products)
  }

  deleteProductName() {
    localStorage.removeItem("Productnames");
  }


  //Price management

  getFinalprice() {
    const finalprice = parseInt(localStorage.getItem("finalamount"))
    console.log(finalprice);
    return finalprice;
  }

  setFinalAmount(finalamount) {
    localStorage.setItem("finalamount", finalamount)
  }

  modifyFinalAmount(finalamount) {
    const modifiedamount = this.getFinalprice()
    finalamount = finalamount + modifiedamount;
    localStorage.setItem("finalamount", finalamount)
  }

  deleteFinalAmount() {
    localStorage.removeItem("finalamount");
  }

  decreaseFinalAmount(finalamount){
    const modifiedamount = this.getFinalprice()
    finalamount = finalamount - modifiedamount;
    localStorage.setItem("finalamount", finalamount)
  }
  

  //OrderID management

  getOrderListener() {
    return this.updatedOrder.asObservable();
  }

  getOrderId() {
    const orderid = localStorage.getItem("orderid");
    console.log(orderid, "ezkell")
    return orderid;
  }
  saveOrderId(orderid: string) {
    localStorage.setItem("orderid", orderid);
  }

  deleteOrderId() {
    localStorage.removeItem("orderid");
  }



  destroyOrder() {
    const orderid = this.getOrderId()
    console.log(orderid)
    this.http.delete("http://localhost:3000/api/order/delete/" + orderid)
    this.deleteOrderId();
    this.deleteFinalAmount();
    this.deleteProductName();
  }
}
