import { Products } from '../../models/products.model';
export class CartItem {
  id: string;
  name: string;
  categories: string;
  img: string;
  price: number;
  quantity: number;
  constructor() {}

  // value(): number {
  //   return this.quantity * this.price;
  // }
}
