import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Output() emitClickSearch = new EventEmitter();
products$: Observable<any[]>;
filter = new FormControl('');

  constructor(private modalService: NgbModal, pipe: DecimalPipe, private productsService: ProductsService) {
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.productsService.search(text, pipe))
    );
  }

  ngOnInit(): void {}

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
