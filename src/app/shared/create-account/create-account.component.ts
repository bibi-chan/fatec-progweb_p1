import { LoginService } from './../login-modal/login.service';
import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/validators.service';
import { Login } from '../login-modal/login';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  formCreatAccount: FormGroup;
  passwd;
  login = {} as Login;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCreatAccount = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(this.validatorService.getFullName()),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(this.validatorService.getEmail()),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(this.validatorService.getPasswd()),
        ],
      ],
      repasswd: [null, [Validators.required, this.matchValues('password')]],
      check: [null, [Validators.required]],
    }, {Validator: this.validadePass}
      // }, {validator: this.checkPasswords }
    );
  }
  matchValues(
    matchTo: 'password' // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}

validadePass() {
  this.formCreatAccount .controls.password.valueChanges.subscribe(() => {
    this.formCreatAccount .controls.confirmPassword.updateValueAndValidity();
  });
  }
  //   checkPasswords(group: FormGroup) {
  //   const pass = group.get('passwd').value;
  //   const confirmPass = group.get('repasswd').value;

  //   return pass === confirmPass ? null : { notSame: true };
  // }

  openSignIn() {
    this.modalService.open(LoginModalComponent, {
      size: 'sm',
    });
  }

  action() {
    const body = this.formCreatAccount.value;
    if (!this.formCreatAccount.valid) {
      // this.activeModal.close('Close click');
      this.validatorService.validateForm(this.formCreatAccount);
    }
    this.login = body;
    this.loginService.addUser(body).subscribe();
  }
}
