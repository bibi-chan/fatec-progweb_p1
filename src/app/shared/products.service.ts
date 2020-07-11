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

  // products(): Observable<Products[]> {
  //   return this.httpClient.get<Products[]>(`${this.api}/products`);
  // }

  // cartItens(): Observable<CartItem[]> {
  //   return this.httpClient.get<CartItem[]>(`${this.api}/cart`);
  // }

  add(item: Products) {
    const foundItem = this.items.find((p) => p.product.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  increaseQty(item: CartItem){
    item.quantity = item.quantity + 1;
  }

  clear() {
    this.items = [];
  }

  remove(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
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

  // salva um produto
  saveProducts(products: Products): Observable<Products> {
    return this.httpClient
      .post<Products>(this.url, JSON.stringify(products), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um produto
  updateProducts(products: Products): Observable<Products> {
    return this.httpClient
      .put<Products>(
        this.url + '/' + products.id,
        JSON.stringify(products),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um produto
  deleteProducts(products: Products) {
    return this.httpClient
      .delete<Products>(this.url + '/' + products.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

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
