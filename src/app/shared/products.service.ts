import { Injectable, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  private products = [
    {id: 1, name: 'Seeds', categories: 'FOOD', img: '../../assets/images/seeds.jpeg', price: '6,90'},
    {id: 2, name: 'Basic Food', categories: 'FOOD', img: '../../assets/images/basicfood.jpeg', price: '8,90'},
    {id: 3, name: 'Gourmet Food', categories: 'FOOD', img: '../../assets/images/gourmetfood.jpeg', price: '12,90'},
    {id: 4, name: 'Vitamin', categories: 'CARE', img: '../../assets/images/vitamin.jpeg', price: '10,90'},
    {id: 5, name: 'Plastic Wheel', categories: 'FITNESS', img: '../../assets/images/plasticwheel.jpeg', price: '15,90'},
    {id: 6, name: 'Metal Wheel', categories: 'FITNESS', img: '../../assets/images/metalwheel.jpeg', price: '15,90'},
  ];

  getProducts(id = false) {
    if (id === false) {
      return this.products;
    }
  }

  performFilter(filterBy: string) {
    if (filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((products) =>
            products.categories.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
        return this.products;
    }
}

search(text: string, pipe: PipeTransform) {
  return this.products.filter(product => {
    const term = text.toLowerCase();
    return product.name.toLowerCase().includes(term)
    || pipe.transform(product.categories).includes(term)
    || pipe.transform(product.price).includes(term);

  });
}

}
