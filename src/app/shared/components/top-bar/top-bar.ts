import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
  imports: [
    RouterLink
  ]
})
export class TopBar {

}
