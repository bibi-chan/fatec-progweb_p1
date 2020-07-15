import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from './../../shared/basket/cart-item.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { Products } from 'src/app/models/products.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss'],
})
export class SearchedProductsComponent implements OnInit {
  term: string;
  product = {} as Products;
  item = {} as CartItem;
  products: Products[] = [];
  showVar = false;
  cartItem: CartItem[] = [];

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    });
  }

  getCart() {
    this.productsService.getCart().subscribe((products: CartItem[]) => {
      this.cartItem = products;
    });
  }

  addItem(item) {
    const foundItem = this.cartItem.filter((p) => p.id === item.id);
    if (foundItem[0]) {
      foundItem[0].quantity = foundItem[0].quantity + 1;
      this.productsService.update(foundItem[0]).subscribe();
    } else {
      this.productsService.add(item).subscribe();
    }
  }

  openDetail(product) {
    const modalRef = this.modalService.open(ProductDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    console.log(product);
  }
}
