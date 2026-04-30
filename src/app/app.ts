import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BottomBar} from './shared/components/bottom-bar/bottom-bar';
import {TopBar} from './shared/components/top-bar/top-bar';
import {SideBar} from './shared/components/side-bar/side-bar';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomBar, TopBar, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
}
