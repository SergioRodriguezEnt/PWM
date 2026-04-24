import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {User, UserService} from '../../../core/user.service';
import {AuthService} from '../../../core/auth.service';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

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

  private users = toSignal(this.userServ.getUsers(), { initialValue: [] as User[] });

  userOwnProfile = computed(() => {
    const email = this.authServ.getEmail();
    const list = this.users();
    return list.find((u: User) => u.email === email) ?? null;
  });

  logout() {
    this.authServ.logout().finally(() => this.router.navigate(['/home']));
  }
}

