import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpService } from '../services/http.service';


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
  cartLink:string;

  constructor(
    public apiService: ApiService,
  ) {}

  async ngOnInit(){
    const products = await this.apiService.get('product');
    this.products = products.filter((product: any) => product.stock>0)
    this.client =  await this.apiService.get('client/1'); // cliente fixo por enquanto
    this.cartLink = "../cart/"+this.client.id
    this.cart = await this.apiService.get('order/cart/'+this.client.id);
    console.log(this.cart)
    this.cartItems = await this.apiService.get('productOrder/order/'+this.cart.id)
    console.log(this.cartItems)
  }

}

