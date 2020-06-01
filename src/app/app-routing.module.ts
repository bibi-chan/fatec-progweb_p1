import { BasketComponent } from './shared/basket/basket.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchedProductsComponent } from './vitrine/searched-products/searched-products.component';


const routes: Routes = [
  {path: '', component: VitrineComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'search', component: SearchedProductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
