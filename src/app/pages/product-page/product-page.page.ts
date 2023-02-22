import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  id: number;
  product: any;
  name='';
  img='';
  price=0;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public apiService: ApiService,
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.product = await this.apiService.get('product/'+this.id)
    console.log(this.product)
    this.name = this.product.name
    this.price = this.product.price
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

}
