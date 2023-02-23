import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  clientId:number;
  cart:any;
  cartOrders:Array<any>; // product orders
  products:Array<any>; // product
  cartItems:Array<any>; // all info

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  async ngOnInit() {
    this.clientId = this.route.snapshot.params['clientId'];
    this.cart = await this.apiService.get('order/cart/'+this.clientId);
    this.cartOrders = await this.apiService.get('productOrder/order/'+this.cart.id)
    this.products = await Promise.all(
      this.cartOrders.map(async (el:any) => {
        let ret = await this.apiService.get('product/'+el.productId)
        return ret
      })
    )
    const cartItems = [] 
    for(let i=0 ; i<this.cartOrders.length ; i++){
      let obj = {...this.products[i], amount: this.cartOrders[i].amount}
      cartItems.push(obj)
    }

    this.cartItems = cartItems;
    console.log(this.cartOrders)
    console.log(this.cartItems)
  }

}
