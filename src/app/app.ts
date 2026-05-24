import {Component, inject, OnInit} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {TopBar} from './shared/components/top-bar/top-bar';
import {SideBar} from './shared/components/side-bar/side-bar';
import {AuthService} from './core/services/auth.service';
import {FavoritesService} from './core/services/favorites.service';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, TopBar, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;

  private favoritesService = inject(FavoritesService);

  async ngOnInit() {
    await this.favoritesService.init();
  }
}
