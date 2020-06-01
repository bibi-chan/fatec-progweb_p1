import { ProductsService } from './../shared/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.scss']
})
export class VitrineComponent implements OnInit {
products;
term: string;
fitness: 'fitness';
// filter = new FormControl('');

  constructor(private productsService: ProductsService, private modalService: NgbModal, pipe: DecimalPipe)
  {
    // this.products = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.productsService.search(text, pipe))
    // );
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  openDetail(product) {
    const modalRef = this.modalService.open(ProductDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    console.log(product);
  }
}

