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

  constructor(
    public apiService: ApiService,
  ) {}

  async ngOnInit(){
    const ret = await this.apiService.get('product');
    this.products = ret;
    console.log(this.products)
  }

}

