import {Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../core/user.service';
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
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router)

  isLookingAtOwnProfile = computed(() => {
    if (!this.router.url.includes('profile')) return false;
    return this.userOwnProfile();
  });

  private userOwnProfile() {
    const userId = this.authService.userId();
    return this.userService.getUser(<string>userId)
  }

  logout() {
    this.authService.logout().finally(() => this.router.navigate(['/home']));
  }
}

