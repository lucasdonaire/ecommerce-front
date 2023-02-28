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
  name='';
  price=0;
  link=''

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
  ) { }

  async ngOnInit() {
    this.name = this.product.name
    this.price = this.product.price
    this.link = "/product-page/"+this.product.id
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

}
