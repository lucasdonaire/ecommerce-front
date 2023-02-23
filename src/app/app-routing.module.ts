import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'product-page/:clientId/:id',
    loadChildren: () => import('./pages/product-page/product-page.module').then( m => m.ProductPagePageModule)
  },
  {
    path: 'cart/:clientId',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
