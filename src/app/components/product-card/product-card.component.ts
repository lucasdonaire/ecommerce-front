import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product:any; // product
  @Input() cart:any; // user
  name='';
  img='';
  price=0;
  link=''

  constructor(
    private sanitizer: DomSanitizer,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.name = this.product.name
    this.price = this.product.price
    this.link = "/product-page/"+this.product.id
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

  async buttonClick(){
    // let ret = await this.apiService.post('product/'+this.product.id,{})
    // console.log(ret)
    // console.log('oi')
    // console.log(this.cart);

    
  }

}

// declare interface Product{
//   name: string
// }