import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TabedListsComponent} from "./features/users/components/users-list/tabed-lists.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabedListsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'atworkhr-angular-frontend';
}
