import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  getFullName() {
    // tslint:disable-next-line:max-line-length
    return /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{1,}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{1,}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{1,}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
  }

  getEmail() {
    // tslint:disable-next-line:max-line-length
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  getPasswd() {
    return  /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,})$/;
  }

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }

  clearValidationForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched({ onlySelf: true });
        control.setErrors(null);
      } else if (control instanceof FormGroup) {
        this.clearValidationForm(control);
      }
    });
  }

  getInvalidFields(formGroup: FormGroup) {
    let invalidFields = [];
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.status === 'INVALID') {
        invalidFields = [...invalidFields, field];
      } else if (control instanceof FormGroup) {
        this.getInvalidFields(control);
      }
    });
    return invalidFields;
  }
}
