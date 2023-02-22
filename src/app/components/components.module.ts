import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
   ],
  declarations: [ 
    ProductCardComponent,
  ],
  exports: [ 
    ProductCardComponent,
  ],
})
export class ComponentsModule { }