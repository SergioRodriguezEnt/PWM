import {Component} from '@angular/core';
import {IonContent} from '@ionic/angular/standalone';
import {BottomBar} from '../bottom-bar/bottom-bar';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.html',
  styleUrl: './page-shell.css',
  imports: [IonContent, BottomBar],
})
export class PageShell {}
