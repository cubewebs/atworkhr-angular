import {Component, computed, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink} from "@angular/router";
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../auth/services/auth.service';
import {DatePickerComponent} from "../../../../shared/components/date-picker/date-picker.component";
import {DatePipe} from "@angular/common";
import {CommunicationService} from "../../../../core/services/communication.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    DatePickerComponent,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit{
  private authService = inject(AuthService)
  public usersService = inject(UsersService);
  private comSrv = inject(CommunicationService)
  public currentUser = signal<User | null>(null);
  selectedDate = signal<Date | null>(null);

  constructor() {
    this.currentUser.set(this.usersService.user);
    effect(() => {
      this.selectedDate.set(this.comSrv.getDate())
      console.log('effect', this.selectedDate())
    }, {allowSignalWrites: true})
  }

  ngOnInit() {
    this.selectedDate.set(this.getDate())
  }

  logout() {
    this.authService.logoutUser();
  }

  getDate() {
    return this.comSrv.getDate();
  }

}
