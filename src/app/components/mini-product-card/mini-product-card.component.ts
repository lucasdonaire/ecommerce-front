import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mini-product-card',
  templateUrl: './mini-product-card.component.html',
  styleUrls: ['./mini-product-card.component.scss'],
})

export class MiniProductCardComponent implements OnInit {
  @Input() product:any; // product
  @Input() cart:any;
  amount:number;
  name:string;
  price:number;

  constructor(
    private sanitizer: DomSanitizer,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.name = this.product.name
    this.price = this.product.price
    this.amount = this.product.amount
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

}
