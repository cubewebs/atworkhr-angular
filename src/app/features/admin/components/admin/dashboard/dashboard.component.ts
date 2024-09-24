import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TabedListsComponent} from "../../../../../shared/components/tabed-lists/tabed-lists.component";
import { GridComponent } from "../../../../../shared/components/filter-table/grid.component";
import { UsersService } from '../../../../users/services/users.service';
import { OfficesService } from '../../../../offices/services/offices.service';
import { User, UsersResponse } from '../../../../users/interfaces/user.interface';
import { Office } from '../../../../offices/interfaces/office.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    TabedListsComponent,
    GridComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private _usersService = inject(UsersService);
  private _officesService = inject(OfficesService);

  public users = signal<User[]>([]);
  public offices = signal<Office[]>([]);
  usersDisplayedColumns = ['uid', 'name', 'email', 'role', 'office', 'actions'];
  officesDisplayedColumns = ['uid', 'name', 'code', 'user','actions'];


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

}
