import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name:string;
  password:string;
  email:string;
  create:string='0';

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private router: Router,
    private alertController: AlertController,  
  ) { }

  async ngOnInit() {
    await this.storage.create()
    let user = await this.storage.get('client')
    if(user){
      await this.userLoggedIn(user)
    }
    // const clients = await this.apiService.get('client')
    // console.log(clients)
  }

  async login(){
    if(this.create==='1'){
      const newClient = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try{
        const client = await this.apiService.post('client',newClient);
        await this.storage.set('client',client.id)
        this.router.navigateByUrl('/home');
      } catch(e){
        await this.unknownErrorCreateClient(e)
      }

    } else {

      try{
        const client = await this.apiService.get('client/login/'+this.email+'/'+this.password)
        await this.storage.set('client',client)
        this.router.navigateByUrl('/home');
      }catch(e){
        if(e==404){
          await this.clientNotFound()
          return
        }
        if(e==403){
          await this.incorrectPassword()
          return
        }
        await this.unknownErrorLogin(e)
      }

    }
  }

  async clientNotFound(){
    const alert = await this.alertController.create({
      header: 'Client not found',
      message: 'This email are not registered. Try again',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async incorrectPassword(){
    const alert = await this.alertController.create({
      header: 'Incorrect Password',
      message: 'Try again',
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async unknownErrorCreateClient(e: any){
    const alert = await this.alertController.create({
      header: 'Error creating client. try again',
      message: String(e),
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async unknownErrorLogin(e: any){
    const alert = await this.alertController.create({
      header: 'Login error. try again',
      message: String(e),
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async userLoggedIn(client:any){
    const alert = await this.alertController.create({
      header: 'User already Logged-In as'+client,
      message: 'Log-out or Keep shopping',
      buttons: [
        {
          text: 'Log-out',
          handler: async ()=>{
            await this.storage.clear()
          }
        },
        {
          text: 'Back to shopping',
          handler: ()=>{
            this.router.navigateByUrl('/home')
          }
        }
      ],
    });
    await alert.present();
  }

}
