import {Component, computed, inject} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {NgOptimizedImage} from '@angular/common';
import {filter, switchMap} from 'rxjs';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
  imports: [
    NgOptimizedImage
  ]
})
export class ProfilePhoto {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  private user = toSignal(
    toObservable(this.authService.userId).pipe(
      filter(id => !!id),
      switchMap(id => this.userService.getUser(id!))
    )
  );

  photoSrc = computed(() => this.user()?.profilePhotoSrc ?? null)

  async goToProfile() {
    console.log(<string>this.authService.userId());
    await this.router.navigate(['/profile'], {queryParams: {id: <string>this.authService.userId()}});
  }
}
