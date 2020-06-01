import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/validators.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService,
    private modalService: NgbModal
  ) {}

  formLogin: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(this.validatorService.getEmail()),
        ],
      ],
      passwd: [null, [Validators.required, Validators.pattern(this.validatorService.getPasswd())]]
    });
  }

  openForgotPassword() {
    this.modalService.open(ForgotPasswordComponent, {
      size: 'sm',
    });
  }

  action() {
    if (!this.formLogin.valid) {
      // this.activeModal.close('Close click');
      this.validatorService.validateForm(this.formLogin);
    }
  }
}
