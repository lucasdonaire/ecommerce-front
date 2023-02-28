import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Storage } from '@ionic/storage-angular';

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
  total:number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create()
    this.clientId = await this.storage.get('client')
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
      let amount =  this.cartOrders[i].amount
      let obj = {...this.products[i], amount: amount}
      if(amount > 0){
        cartItems.push(obj)
      }
    }
    this.cartItems = cartItems;
    this.total = this.cartItems.reduce((total,atual)=>{
      return total + atual.amount*atual.price
    },0)

  }

  calcularSoma(){
    this.total = this.cartItems.reduce((total,atual)=>{
      return total + atual.amount*atual.price
    },0)
  }

  async endShop(){

  }

}
