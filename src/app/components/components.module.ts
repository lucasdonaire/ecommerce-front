import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MiniProductCardComponent } from './mini-product-card/mini-product-card.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
   ],
  declarations: [ 
    ProductCardComponent,
    MiniProductCardComponent,
  ],
  exports: [ 
    ProductCardComponent,
    MiniProductCardComponent,
  ],
})
export class ComponentsModule { }