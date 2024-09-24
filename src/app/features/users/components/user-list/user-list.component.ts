import {Component, inject, OnInit, signal} from '@angular/core';
import MainLayoutComponent from "../../../admin/components/admin/main-layout/main-layout.component";
import {GridComponent} from "../../../../shared/components/filter-table/grid.component";
import {UsersService} from "../../services/users.service";
import {OfficesService} from "../../../offices/services/offices.service";
import {User, UsersResponse} from "../../interfaces/user.interface";
import {Office} from "../../../offices/interfaces/office.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
    imports: [MainLayoutComponent, GridComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  private _usersService = inject(UsersService);
  private _officesService = inject(OfficesService);
  private router = inject(Router);

  public users = signal<User[]>([]);
  public offices = signal<Office[]>([]);
  usersDisplayedColumns = ['uid', 'firstName', 'lastName', 'email', 'role', 'office', 'actions'];
  officesDisplayedColumns = ['uid', 'firstName', 'lastName', 'code', 'user','actions'];

  ngOnInit(): void {
    this.getUsers();
    this.getOffices();
  }

  getUsers() {
    this._usersService.getUsers().subscribe({
      next: (res: UsersResponse) => {
        console.log(res);

        this.users.set([...res.users]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getOffices() {
    this._officesService.getOffices().subscribe({
      next: (res: Office[]) => {
        this.offices.set([...res]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  gridActions(actions: any) {
    console.log(actions);
    const {action, element} = actions;
    if (action === 'delete') {
      this._usersService.deleteUser(element.uid).subscribe({
        next: (res) => {
          console.log(res);
          this.getUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else if (action === 'edit') {
      this.router.navigate(['/users/edit', element.uid]);
    }
  }

}
