import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product:any; // product
  // @Input() cart:any;
  cart:any;
  name='';
  price=0;
  link=''

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create()
    const clientId = await this.storage.get('client')
    this.cart = await this.apiService.get('order/cart/'+clientId);
    this.name = this.product.name
    this.price = this.product.price
    this.link = "/product-page/"+this.product.id
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

}
