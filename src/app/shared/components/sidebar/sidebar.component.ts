import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { UsersService } from '../../../features/users/services/users.service';
import { User } from '../../../features/users/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  private _authSrv = inject(AuthService);
  private usersService = inject(UsersService)
  private router = inject(Router)
  mobileQuery: MediaQueryList;
  isLogedin = signal(false)
  id = signal('0')
  currentuser = computed(() => {
    this.getActualUser()
  })

  fillerNav = [
    {name: 'Dashboard', link: '/admin/dashboard', icon: 'dashboard'},
    {name: 'Users', link: '/users/dashboard', icon: 'people'},
    {name: 'Profile', link: `/users/${this.id()}`, icon: 'shield_person'},
    {name: 'Offices', link: '/offices/dashboard', icon: 'fax'},
  ];

  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getActualUser() {
    const id = localStorage.getItem('id') ?? '0'
    console.log('id: ', id);

    this.usersService.getUser(id).subscribe({
      next: (user) => {
        this.id.set(user.user.uid)

      }
    })

  }

  ngOnInit(): void {
    this.getActualUser()
    console.log(this.getActualUser());
    const token = localStorage.getItem('token');
    if(token) {
      this.isLogedin.set(true)
    } else {
      this.isLogedin.set(false)
    }

  }

  logoutUser() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
