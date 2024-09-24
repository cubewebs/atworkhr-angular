import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-offices-main-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './offices-main-layout.component.html',
  styleUrl: './offices-main-layout.component.scss'
})
export default class OfficesMainLayoutComponent {

}
