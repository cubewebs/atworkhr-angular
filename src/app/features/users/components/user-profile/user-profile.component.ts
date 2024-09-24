import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  route = inject(ActivatedRoute)
  usersService = inject(UsersService)
  id = signal('0');
  currentuser = signal<User | null>(null)
  fechaAlta = '2/9/2024';
  hoy = `${new Date().toLocaleDateString('es-ES')}`;

  ngOnInit(): void {
    console.log(this.usersService.user);
    this.currentuser.set(this.usersService.user)
    
  }
}
