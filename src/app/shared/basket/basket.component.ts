import { CartItem } from './cart-item.model';
import { ProductsService } from 'src/app/shared/products.service';
import { Products } from '../../models/products.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  // constructor() { }
  // products = [
  //   {name: 'Seeds', categories: '1', img: '../../assets/images/seeds.jpeg', price: '13,80', qty: 2},
  //   {name: 'Basic Food', categories: '1', img: '../../assets/images/basicfood.jpeg', price: '8,90', qty: 1}
  // ];

  // ngOnInit(): void {
  // }

  product = {} as Products;
  // products: Products[];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
this.items();
  }

  items(): any[] {
    return this.productService.items;
  }

 clear() {
this.productService.clear();
 }

 add(item: Products) {
   this.productService.add(item);
 }

 remove(item: CartItem) {
  this.productService.remove(item);
 }

 total(): number {
  return this.productService.total();
 }


}
