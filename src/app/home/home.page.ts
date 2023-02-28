import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpService } from '../services/http.service';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products = [];
  client:any;
  cart:any;
  cartItems:Array<any>;

  constructor(
    private apiService: ApiService,
    private storage: Storage
  ) {}

  async ngOnInit(){
    await this.storage.create();
    await this.storage.set('client', 1)
    const clientId = await this.storage.get('client')
    // console.log(clientId)
    // const client = {id:1}
    const products = await this.apiService.get('product');
    this.products = products.filter((product: any) => product.stock>0)
    // this.client =  await this.apiService.get('client/1'); // cliente fixo por enquanto
    this.client =  await this.apiService.get('client/'+clientId); // cliente fixo por enquanto
    // this.cartLink = "../cart/"+this.client.id
    // this.cart = await this.apiService.get('order/cart/'+this.client.id);
    // console.log(this.cart)
    // this.cartItems = await this.apiService.get('productOrder/order/'+this.cart.id)
    // console.log(this.cartItems)
  }

}

