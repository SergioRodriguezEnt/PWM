import {Component, computed, inject, input} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {of, switchMap} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {ProfilePhoto} from '../profile-photo/profile-photo';

@Component({
  selector: 'floating-profile',
  templateUrl: './floating-profile.html',
  styleUrl: './floating-profile.css',
  imports: [ProfilePhoto],
})
export class FloatingProfile {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  hideForUserId = input<string>('');

  private currentUser = toSignal(
    toObservable(this.authService.userId).pipe(
      switchMap(uid => (uid ? this.userService.get(uid) : of(undefined))),
    ),
    { initialValue: undefined },
  );

  show = computed(() => {
    const me = this.currentUser();
    return !!me && me.id !== this.hideForUserId();
  });

  src = computed(() => this.currentUser()?.profileSrc ?? '');
  alt = computed(() => this.currentUser()?.name ?? 'Mi perfil');
  userId = computed(() => this.currentUser()?.id ?? '');
}
