import {Component, inject, OnInit, signal} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User, UsersResponse} from "../../interfaces/user.interface";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  public usersService = inject(UsersService);
  public users = signal<User[]>([]);
    ngOnInit(): void {
        this.usersService.getUsers().subscribe({
          next: (res) => {
            console.log('users', res.users)
            if(res) {
              this.users.set([...res.users])
            }

          },
          error: (err) => {
            console.error(err)
          }
        })
    }

}
