import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsValidatorsService} from "../../core/services/forms-validators.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCard, MatCardContent, MatIcon, MatIconButton, MatCardHeader, MatCardActions, MatButton, MatCardTitle, RouterLink, MatCardFooter],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  private validatorsService = inject(FormsValidatorsService);
  private fb = inject(FormBuilder);
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  hide = signal(true);

  isInvalidField (field: string) {
    return this.validatorsService.isInvalidField(this.loginForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.loginForm, field)
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      console.log(this.loginForm.value);
    }
  }

}
