import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TabedListsComponent} from "../../../../users/components/users-list/tabed-lists.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    TabedListsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
