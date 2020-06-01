import { ProductsService } from './../../shared/products.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
@Input() product;
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.product);
  }

}
