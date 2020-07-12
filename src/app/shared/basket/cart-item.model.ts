import { Products } from '../../models/products.model';
export class CartItem {
  id: string;
  name: string;
  categories: string;
  img: string;
  price: number;
  constructor(public product: Products, public quantity: number = 1) {}

  value(): number {
    return this.product.price * this.quantity;
  }
}
