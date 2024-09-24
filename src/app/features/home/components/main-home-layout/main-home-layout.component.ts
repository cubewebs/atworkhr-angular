import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-main-home-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './main-home-layout.component.html',
  styleUrl: './main-home-layout.component.scss'
})
export default class MainHomeLayoutComponent {

}
