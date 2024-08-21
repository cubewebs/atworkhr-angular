import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsValidatorsService {

  public isInvalidField(form: AbstractControl, field: string) {
    return form.get(field)?.errors && form.get(field)?.touched
  }

  public passwordMatch(field1: string, field2: string): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(field1)?.value;
      const password2 = formGroup.get(field2)?.value;
      if (password !== password2) {
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true};
      }
      if (password === password2 && formGroup.get(field2)?.touched) {
        formGroup.get(field2)?.setErrors(null);
      }
      return null;
    }
  }


  public getFieldError(control: AbstractControl, field: string): string | null {
    if ( !control.get(field) && !control.get(field)?.errors ) return null;

    const errors = control.get(field)?.errors || {};

    for ( const key of Object.keys(errors) ) {
      switch ( key ) {
        case 'required':
          return `This field is required`;

        case 'minlength':
          return `Minimum characters must be ${ errors['minlength'].requiredLength }`;
        case 'pattern':
          return `Invalid email`;
        case 'notEqual':
          return `Passwords are not the same`;
      }
    }

    return null;
  }

}
