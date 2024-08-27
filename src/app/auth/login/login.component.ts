import {Component, inject, output, signal} from '@angular/core';
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
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {emailPattern, passwordPattern} from "../../core/constants/patterns";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardTitle,
    RouterLink,
    MatCardFooter,
    JsonPipe,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  private validatorsService = inject(FormsValidatorsService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    remember: [false]
  })
  hide = signal(true);
  isInvalidLogin = signal(false);

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
      const {email, password, remember} = this.loginForm.value;
      if (email && password) {
        this.authService.loginUser(email, password).subscribe({
          next: (res) => {
            if (res.token) {
              if(remember) {
                localStorage.setItem('email', email)
              } else {
                localStorage.removeItem('email')
              }
              this.isInvalidLogin.set(false);
              this.loginForm.reset();
              this.router.navigate(['/home'])
            }
          },
          error: (err) => {
            console.error('error', err.error.ok, err.error.msg)
            this.isInvalidLogin.set(true);
            this._snackBar.open('Email or password is incorrect', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000}
            )

          }
        })
      }
    }
  }

}
