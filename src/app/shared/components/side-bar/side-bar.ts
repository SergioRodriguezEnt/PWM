import {Component, computed, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {User, UserService} from '../../../core/user.service';
import {AuthService} from '../../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
  imports: [
    RouterLink
  ]
})
export class SideBar {
  private userServ = inject(UserService);
  private authServ = inject(AuthService);
  private router = inject(Router)

  isLoggedIn = this.authServ.isLoggedIn

  userOwnProfile = computed(() => {
    this.userServ.getUsers().
  })

  logout() {
    this.authServ.logout().finally(() => this.router.navigate(['/home']));
  }
}

