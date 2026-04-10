import { Component } from '@angular/core';
import {LoginForm} from './login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    LoginForm
  ]
})
export class Login{}

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
