import { LoginService } from './../shared/login-modal/login.service';
import { Login } from './../shared/login-modal/login';
import { ProductsService } from './../shared/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Products } from '../models/products.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.scss']
})
export class VitrineComponent implements OnInit {
  product = {} as Products;
  products: Products[] = [];
  login: Login[] = [];
  item: Observable<Products[]>;
term = 'All';
filter = new FormControl('');

  constructor(private productsService: ProductsService, private route: ActivatedRoute,
              private modalService: NgbModal, private pipe: DecimalPipe,
              private loginService: LoginService)
  {
    // this.products = this.filter.valueChanges.pipe(
    // startWith(''),
    // map(text => this.productsService.search(text, pipe))
    // );
  }

  ngOnInit(): void {
    this.getProducts();
    this.item = this.productsService.getProductById(this.route.snapshot.params.id);
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    });
  }

  getLogin() {
    this.loginService.getLogin().subscribe((login: Login[]) => {
      this.login = login;
    });
  }


  // showAll(categories) {
  //   this.products = this.productsService.getProducts();
  // }

  // filterItensByCategory(categories) {
    // this.filteredItens = this.products.filter((product) => {
    //   return product.categories.includes(this.products.categories);
    // });

  //   this.products = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(fitness => this.productsService.search(fitness, this.pipe))
  //     );
  // }

  openDetail(product) {
    const modalRef = this.modalService.open(ProductDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
  }

  addItem(item) {
    console.log(item);
    this.productsService.add(item);
  }
}

