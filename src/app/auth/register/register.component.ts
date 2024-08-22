import {Component, inject, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule, MatCardTitle} from "@angular/material/card";

import {emailPattern, passwordPattern} from "../../core/constants/patterns";
import {FormsValidatorsService} from "../../core/services/forms-validators.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, MatError, MatFormField, MatIcon, MatInput, MatLabel, MatSuffix, MatCardTitle, ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {

  private http = inject(HttpClient);
  public validatorsService = inject(FormsValidatorsService);
  public authService = inject(AuthService);
  private fb = inject(FormBuilder);
  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.passwordMatch('password', 'password2')
    ]
  })
  hide = signal(true);

  isInvalidField (field: string) {
    return this.validatorsService.isInvalidField(this.registerForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.registerForm, field)
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      const {name, email, password} = this.registerForm.value;
      this.authService.registerUser(name, email, password, 'USER_ROLE').subscribe({
        next: (res) => {
          console.log(res)
        }
      })
    }
  }

}
