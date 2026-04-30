import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
  imports: [
    NgOptimizedImage
  ]
})
export class ProfilePhoto {
  src = input<string>('');
  alt = input<string>('Profile photo');
  size = input<number>(64);
}
