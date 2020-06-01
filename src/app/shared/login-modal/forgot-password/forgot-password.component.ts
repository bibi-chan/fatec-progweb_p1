import { LoginModalComponent } from './../login-modal.component';
import { ValidatorsService } from './../../../validators.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private validatorService: ValidatorsService,
              private modalService: NgbModal,
    ) {}

  formForgotPass: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formForgotPass = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.validatorService.getEmail())]]
    });
  }

  action() {
    if (!this.formForgotPass.valid){
      // this.activeModal.close('Close click');
      this.validatorService.validateForm(this.formForgotPass);
    }
  }

}
