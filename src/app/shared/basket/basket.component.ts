import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor() { }
  products = [
    {name: 'Seeds', categories: '1', img: '../../assets/images/seeds.jpeg', price: '13,80', qty: 2},
    {name: 'Basic Food', categories: '1', img: '../../assets/images/basicfood.jpeg', price: '8,90', qty: 1}
  ];

  ngOnInit(): void {
  }

}
