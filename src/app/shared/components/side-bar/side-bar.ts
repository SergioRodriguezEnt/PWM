import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {User, UserService} from '../../../core/user.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
  imports: [
    RouterLink
  ]
})
export class SideBar {
  userServ = inject(UserService);
  user = signal(new URLSearchParams().get("user"))
}

