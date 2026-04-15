import {Component, computed, inject, signal} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
  imports: [
    RouterLink
  ]
})
export class ProfilePhoto {
  userServ = inject(UserService)
}
