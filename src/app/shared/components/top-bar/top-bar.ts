import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
  imports: [
    RouterLink,
    IonButton
  ]
})
export class TopBar {

}
