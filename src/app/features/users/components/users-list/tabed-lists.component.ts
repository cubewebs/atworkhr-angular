import {Component, inject, OnInit, signal} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User, UsersResponse} from "../../interfaces/user.interface";
import {JsonPipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {GridComponent} from "../../../../shared/components/filter-table/grid.component";
import {Office} from "../../../offices/interfaces/office.interface";
import {OfficesService} from "../../../offices/services/offices.service";

@Component({
  selector: 'app-tabed-lists',
  standalone: true,
  imports: [
    JsonPipe,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    GridComponent
  ],
  templateUrl: './tabed-lists.component.html',
  styleUrl: './tabed-lists.component.scss'
})
export class TabedListsComponent implements OnInit {
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
