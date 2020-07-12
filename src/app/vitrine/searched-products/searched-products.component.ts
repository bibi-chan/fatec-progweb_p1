import { CartItem } from './../../shared/basket/cart-item.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { Products } from 'src/app/models/products.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss']
})
export class SearchedProductsComponent implements OnInit {
  term: string;
  product = {} as Products;
  item = {} as CartItem;
  products: Products[] = [];
  showVar = false;

  constructor(private productsService: ProductsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();

  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    });
  }

  addItem(item) {
    console.log(item);
    this.productsService.add(item).subscribe();
  }

  openDetail(product) {
    const modalRef = this.modalService.open(ProductDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    console.log(product);
  }
}
