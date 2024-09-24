import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsValidatorsService} from "../../../../core/services/forms-validators.service";
import {emailPattern} from "../../../../core/constants/patterns";
import {MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatDialogContent, MatButton],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit{
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private userSrv = inject(UsersService)
  private validationSrv = inject(FormsValidatorsService)
  private fb: FormBuilder = inject(FormBuilder)
  userForm!: FormGroup;
  uid!: string;

  ngOnInit() {
    this.initForm()
    this.getUserEdited()
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      phone: [''],
      gender: [''],
      jobTitle: [''],
      address: [''],
      city: [''],
      country: [''],
      postalCode: ['']
    });
  }

  onSubmit() {
    this.userSrv.editUser(this.uid, this.userForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUserEdited() {
    this.route.params.subscribe({
      next: (params) => {
        this.uid = params['id'];
        console.log('params', this.uid);
        this.userSrv.getUser(this.uid).subscribe({
          next: (res) => {
            this.userForm.reset(res.user);
          }
        })
      }
    })
  }
}
