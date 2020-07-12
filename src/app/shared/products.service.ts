import { Products } from '../models/products.model';
import { Injectable, PipeTransform } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { CartItem } from './basket/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  api = 'http://localhost:3000';

  url = 'http://localhost:3000/products'; // api rest fake
  cart = 'http://localhost:3000/cart';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  items: CartItem[] = [];

  products(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.api}/products`);
  }

  cartItens(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this.api}/cart`);
  }

  add(item: Products): Observable<CartItem> {
    const foundItem = this.items.find((p) => p.product.id === item.id);
    if (foundItem) {
      // foundItem.quantity = foundItem.quantity + 1;
      this.increaseQty(foundItem);
      return this.httpClient
        .put<CartItem>(
          this.cart + '/' + foundItem.id,
          JSON.stringify((foundItem.quantity = foundItem.quantity + 1)),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));

    } else {
      // this.items.push(new CartItem(item));
      return this.httpClient
        .post<CartItem>(this.cart, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }
  }

  increaseQty(item: CartItem){
    item.quantity = item.quantity + 1;
  }
  update(id, post): Observable<CartItem> {
    return this.httpClient
      .put<CartItem>(this.cart + id, JSON.stringify(post), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // deleta um produto
  deleteProducts(products: CartItem) {
    return this.httpClient
      .delete<CartItem>(this.cart + '/' + products.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  total(): number {
    return this.items
      .map((item) => item.value())
      .reduce((prev, value) => prev + value);
  }

  // Obtem todos os produtos
  getProducts(): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCart(): Observable<CartItem[]> {
    return this.httpClient
      .get<CartItem[]>(this.cart)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem um produto pelo id
  getProductById(id: number): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  clear() {
    return (this.items = []);
  }

  // update(item: CartItem) {
  //   const foundItem = this.items.find((p) => p.product.id === item.id);
  //   if (foundItem) {
  //     foundItem.quantity = foundItem.quantity + 1;
  //     return this.httpClient
  //       .put<CartItem>(
  //         this.cart + '/' + foundItem.id,
  //         JSON.stringify(foundItem.quantity + 1),
  //         this.httpOptions
  //       )
  //       .pipe(retry(1), catchError(this.handleError));
  //   } else {
  //     return this.httpClient.put<CartItem>(this.cart, JSON.stringify(item), this.httpOptions)
  //   .pipe(retry(2), catchError(this.handleError));
  //   }
  // }

  // remove(item: CartItem) {
  //   this.items.splice(this.items.indexOf(item), 1);
  // }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // private products = [
  //   {id: 1, name: 'Seeds', categories: 'FOOD', img: '../../assets/images/seeds.jpeg', price: '6,90'},
  //   {id: 2, name: 'Basic Food', categories: 'FOOD', img: '../../assets/images/basicfood.jpeg', price: '8,90'},
  //   {id: 3, name: 'Gourmet Food', categories: 'FOOD', img: '../../assets/images/gourmetfood.jpeg', price: '12,90'},
  //   {id: 4, name: 'Vitamin', categories: 'ProductsE', img: '../../assets/images/vitamin.jpeg', price: '10,90'},
  //   {id: 5, name: 'Plastic Wheel', categories: 'FITNESS', img: '../../assets/images/plasticwheel.jpeg', price: '15,90'},
  //   {id: 6, name: 'Metal Wheel', categories: 'FITNESS', img: '../../assets/images/metalwheel.jpeg', price: '15,90'},
  // ];

  //   getProducts(id = false) {
  //     if (id === false) {
  //       return this.products;
  //     }
  //   }

  //   performFilter(filterBy: string) {
  //     if (filterBy) {
  //         filterBy = filterBy.toLocaleLowerCase();
  //         return this.products.filter((products) =>
  //             products.categories.toLocaleLowerCase().indexOf(filterBy) !== -1);
  //     } else {
  //         return this.products;
  //     }
  // }

  search(text: string, pipe: PipeTransform) {
    //   return this.products.filter(product => {
    //     const term = text.toLowerCase();
    //     return product.name.toLowerCase().includes(term)
    //     || pipe.transform(product.categories).includes(term)
    //     || pipe.transform(product.price).includes(term);
    //   });
  }
}
