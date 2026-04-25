import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
  private authService = inject(AuthService);
  private router = inject(Router)
  private route = inject(ActivatedRoute);

  isLookingAtOwnProfile = computed(() => {
    if (!this.router.url.includes('profile')) return false;
    return this.userOwnProfile();
  });

  private userOwnProfile() {
    const userId = this.authService.userId();
    const profileUserId = this.route.snapshot.queryParamMap.get('id')
    return userId === profileUserId;
  }

  logout() {
    this.authService.logout().finally(() => this.router.navigate(['/home']));
  }
}
