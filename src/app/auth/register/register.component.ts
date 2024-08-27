import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

// material
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

// custom
import {emailPattern, passwordPattern} from "../../core/constants/patterns";
import {FormsValidatorsService} from "../../core/services/forms-validators.service";
import {AuthService} from "../services/auth.service";
import {UsersService} from "../../features/users/services/users.service";
import {map} from "rxjs";
import {OfficesService} from "../../features/offices/services/offices.service";
import {Office} from "../../features/offices/interfaces/office.interface";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    MatCardTitle,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private route = inject(Router);
  public validatorsService = inject(FormsValidatorsService);
  public authService = inject(AuthService);
  public usersService = inject(UsersService);
  public officesService = inject(OfficesService);
  private fb = inject(FormBuilder);
  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    password2: ['', [Validators.required]],
    role: ['USER_ROLE', [Validators.required]],
    office: []
  }, {
    validators: [
      this.validatorsService.passwordMatch('password', 'password2')
    ]
  })
  public offices = signal<Office[]>([])
  hide = signal(true);
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public roles = [
    {name: 'Employee', value: 'EMPLOYEE_ROLE'},
    {name: 'Director', value: 'DIRECTOR_ROLE'},
    {name: 'CEO', value: 'CEO_ROLE'},
    {name: 'Admin', value: 'ADMIN_ROLE'},
  ];

  ngOnInit() {
    // TODO: Create a service to get all offices and expose them in the select field
    this.initGetOffices();
  }

  isInvalidField (field: string) {
    return this.validatorsService.isInvalidField(this.registerForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.registerForm, field)
  }

  initGetOffices() {
    this.officesService.getOffices().subscribe({
      next: (res) => {
        this.offices.set([...res])
      },
      error: (err) => {
        console.error('GET Offices Error-> ', err)
      }
    })
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
      const {name, email, password, role} = this.registerForm.value;
      this.authService.registerUser(name, email, password, role).subscribe({
        next: (res) => {
          this._snackBar.open(`Account created ${res.name}, Please login`, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          })
          this.registerForm.reset();
        },
        error: (err) => {
          console.error(err)
        }
      })

    }
  }

}
