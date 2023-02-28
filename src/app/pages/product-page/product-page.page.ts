import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
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
  amount:number;
  arrayAmount:Array<number>;
  inCart:any;
  cart:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private alertController: AlertController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create()
    this.id = this.route.snapshot.params['id'];
    this.product = await this.apiService.get('product/'+this.id)
    this.name = this.product.name
    this.price = this.product.price

    this.clientId = await this.storage.get('client')
    if(this.clientId){
      this.cart = await this.apiService.get('order/cart/'+this.clientId);
      const cartItems = await this.apiService.get('productOrder/order/'+this.cart.id)
      this.inCart = cartItems.filter((el:any) => el.productId == this.id)[0] || {amount:0}
    }
    this.amount = this?.inCart?.amount || 0

    const arrayAmount = []
    for(let i=0; i<this.product.stock ; i++){
      arrayAmount.push(i)
    }
    this.arrayAmount = arrayAmount
  }

  getImgContent(): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(this.product.image);  // traduzindo a imagem para ser utilizada
  }

  async click(){
    if(!this.clientId){
      this.alertClientLogin()
      return
    }
    const productOrder = {
      orderId: this.cart.id,
      productId: this.product.id,
      amount: this.amount
    }
    try{
      await this.apiService.post('productOrder',productOrder)
      this.inCart.amount = this.amount
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

  async alertClientLogin(){
    const alert = await this.alertController.create({
      header: 'Não é possível comprar pois você nao esta logado',
      message: 'se fudeu',
      buttons: [
        {
          text:'OK'
        },
        {
          text:'Fazer Login', 
          handler: () => {
            this.router.navigateByUrl('/login');
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
    return 'você tem '+this.inCart.amount+' itens em seu carinho'
  }

}
