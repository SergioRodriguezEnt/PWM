import {Component, inject} from '@angular/core';
import {LoginForm} from './login-form';
import {TopBar} from '../../shared/components/top-bar/top-bar';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';
import {AuthService} from '../../core/auth.service';
import {Router} from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    LoginForm,
    TopBar,
    BottomBar
  ]
})
export class Login{
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMsg = '';

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/search']); // redirige tras login
    } catch (error: any) {
      this.errorMsg = error.message;
    }
  }


}

/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/templates/json/login-form.json", loadLoginForm),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  let user = getLocal("user");
  if (user) {
    window.location.href = "../search/search-with-user.html";
    return;
  }
  Promise.all([setupTopBar(), setupLoginForm()]).catch(console.error);
}*/
