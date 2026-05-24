import {Component, inject, OnInit, viewChild} from '@angular/core';
import {IonApp, IonRouterOutlet, Platform} from '@ionic/angular/standalone';
import {App as CapApp} from '@capacitor/app';
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
  private platform = inject(Platform);
  private routerOutlet = viewChild.required(IonRouterOutlet);

  constructor() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      const outlet = this.routerOutlet();
      if (outlet.canGoBack()) {
        outlet.pop();
      } else {
        processNextHandler();
      }
    });

    this.platform.backButton.subscribeWithPriority(-1, () => {
      CapApp.exitApp();
    });
  }

  async ngOnInit() {
    await this.favoritesService.init();
  }
}
