import { BasketComponent } from './shared/basket/basket.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: VitrineComponent},
  {path: 'basket', component: BasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
