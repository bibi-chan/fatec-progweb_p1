import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Output() emitClickSearch = new EventEmitter();
products;
term: string;

  constructor(private modalService: NgbModal,  private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();

  }

  open() {
    this.modalService.open(LoginModalComponent, {
      size: 'sm',
    });
  }
  openSignUp() {
    this.modalService.open(CreateAccountComponent, {
      size: 'sm',
    });
  }

}
