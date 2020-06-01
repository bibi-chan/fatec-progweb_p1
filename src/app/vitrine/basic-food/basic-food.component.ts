import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-food',
  templateUrl: './basic-food.component.html',
  styleUrls: ['./basic-food.component.scss']
})
export class BasicFoodComponent implements OnInit {
  @Input() product;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.product);

  }

}
