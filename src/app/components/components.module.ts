import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MiniProductCardComponent } from './mini-product-card/mini-product-card.component';
import { ProductCardComponent } from './product-card/product-card.component';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    IonicStorageModule.forRoot(),
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