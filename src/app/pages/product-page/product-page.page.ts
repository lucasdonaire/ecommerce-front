import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  id: number;
  clientId:number;
  product: any;
  name:string;
  img:string;
  price:number;
  amount=1;
  inCart:any;
  cart:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.product = await this.apiService.get('product/'+this.id)
    this.clientId = this.route.snapshot.params['clientId'];
    this.cart = await this.apiService.get('order/cart/'+this.clientId);
    const cartItems = await this.apiService.get('productOrder/order/'+this.cart.id)
    this.inCart = cartItems.filter((el:any)=> el.productId == this.id)[0]
    this.name = this.product.name
    this.price = this.product.price
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

  async click(){
    const productOrder = {
      orderId: this.cart.id,
      productId: this.product.id,
      amount: this.amount
    }
    try{
      await this.apiService.post('productOrder',productOrder)
      console.log('comprados '+this.amount+' itens')
      this.inCart.amount = this.amount
      this.amount = 1
      await this.presentAlert()
    }catch(e){
      console.log(e)
    }
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Carrinho atualizado',
      message: 'Produto adicionado ao carrinho',
      buttons: [
        {
          text:'OK'
        },
        {
          text:'Continuar comprando', 
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }
      ],
    });
    await alert.present();
  }

  textButton(){
    if(this.inCart && this.inCart?.amount>0){
      return 'update cart'
    }
    return 'add to cart'
  }

  textMessage(){
    // if(this.inCart && this.inCart?.amount>0){
      return 'você tem '+this.inCart.amount+' itens em seu carinho'
    // }
    // return ''
  }

}
