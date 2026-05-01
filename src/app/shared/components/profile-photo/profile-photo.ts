import {Component, computed, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
  imports: [
    NgOptimizedImage,
    RouterLink
  ]
})
export class ProfilePhoto {
  src = input<string>('');
  alt = input<string>('Profile photo');
  size = input<number>(64);
  userId = input<string>('');

  hasLink = computed(() => !!this.userId());
}
