import { Products } from '../../models/products.model';
export class CartItem {
constructor(public product: Products, public quantity: number =  1) {}

value(): number {
  return this.product.price * this.quantity;
}
}
