import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.scss']
})
export class VitrineComponent implements OnInit {

  products = [
    {name: 'seeds', category: 'food', img: '../../assets/images/seeds.jpeg'},
    {name: 'basicfood', category: 'food', img: '../../assets/images/basicfood.jpeg'},
    {name: 'gourmetfood', category: 'food', img: '../../assets/images/gourmetfood.jpeg'},
    {name: 'vitamin', category: 'care', img: '../../assets/images/vitamin.jpeg'},
    {name: 'plasticwheel', category: 'fitness', img: '../../assets/images/plasticwheel.jpeg'},
    {name: 'metalwheel', category: 'fitness', img: '../../assets/images/metalwheel.jpeg'},


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
