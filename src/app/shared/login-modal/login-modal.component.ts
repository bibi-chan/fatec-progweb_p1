import { LoginService } from './login.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/validators.service';
import { Login } from './login';

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
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  formLogin: FormGroup;
  user: Login[] = [];

  ngOnInit(): void {
    this.createForm();
    this.getUser();
  }
  getUser() {
    this.loginService.getUser().subscribe((user: Login[]) => {
      this.user = user;
    });
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
      password: [null, [Validators.required, Validators.pattern(this.validatorService.getPasswd())]]
    });
  }

  openForgotPassword() {
    this.modalService.open(ForgotPasswordComponent, {
      size: 'sm',
    });
  }

  action(user) {
    if (!this.formLogin.valid) {
      // this.activeModal.close('Close click');
      this.validatorService.validateForm(this.formLogin);
    }
    const found = this.user.filter((u) => u.id === user.id);
    if (found[0]) {
      this.loginService.addLogin(user).subscribe();
  }
}
}
