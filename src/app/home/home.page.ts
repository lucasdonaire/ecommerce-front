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

  constructor(
    private apiService: ApiService,
    private storage: Storage
  ) {}

  async ngOnInit(){
    await this.storage.create();

    const products = await this.apiService.get('product');
    console.log(products)
    this.products = products.filter((product: any) => product.stock>0)
    
    let clientId = await this.storage.get('client')
    if(clientId){
      this.client =  await this.apiService.get('client/'+clientId); // cliente fixo por enquanto
    } else {
      this.client = null
    }
  }

}

