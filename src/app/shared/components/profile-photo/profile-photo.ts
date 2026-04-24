import {Component, computed, inject, signal} from '@angular/core';
import {User, UserService} from '../../../core/user.service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../core/auth.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
  imports: [
    RouterLink
  ]
})
export class ProfilePhoto {
  private authServ = inject(AuthService);
  private userServ = inject(UserService);

  private users = toSignal(this.userServ.getUsers(), { initialValue: [] as User[] });

  isLoggedIn = this.authServ.isLoggedIn

  user = computed(() => {
    const email = this.authServ.getEmail();
    const list = this.users();
    return list.find((u: User) => u.email === email) ?? null;
  });
}
