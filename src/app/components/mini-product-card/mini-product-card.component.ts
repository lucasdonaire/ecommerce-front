import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-mini-product-card',
  templateUrl: './mini-product-card.component.html',
  styleUrls: ['./mini-product-card.component.scss'],
})

export class MiniProductCardComponent implements OnInit {
  @Input() product:any; // product
  @Input() cart:any; // product
  @Input() amount:number;
  @Output() amountChange = new EventEmitter<number>();
  show=true;
  // cart:any;
  name:string;
  price:number;

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create()
    const clientId = await this.storage.get('client')
    // this.cart = await this.apiService.get('order/cart/'+clientId);
    this.name = this.product.name
    this.price = this.product.price
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

  async removerProduto(){
    const productOrder = {
      orderId: this.cart.id,
      productId: this.product.id,
      amount: 0
    }
    try{
      await this.apiService.post('productOrder',productOrder)
      this.product.amount=0
      this.amount = 0
      this.show=false;
      this.amountChange.emit(this.amount)
    }catch(e){
      console.log(e)
    }

  }

}
