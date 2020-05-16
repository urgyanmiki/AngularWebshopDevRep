import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { async } from '@angular/core/testing';
import { CartService } from '../shopping-cart/cart.service';

declare var paypal;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  constructor(private cartservice: CartService) {   }
   
   product={
    price: this.cartservice.getFinalprice(),
    description: 'bought clothes',

  }
  paidFor=false;

  ngOnInit() {
    paypal.Buttons({
      createOrder: (data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description,
              amount: {
                currency_code:'USD',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async(data,actions)=>{
        const order = await actions.order.capture();
        this.paidFor=true;
        this.cartservice.saveOrder();
        console.log(order);
      },
      onError: err =>{
        console.log(err);
      }
    }).
    render(this.paypalElement.nativeElement);
  }

}
