import { Component } from '@angular/core';
import {RegisterForm} from './register-form';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';
import {TopBar} from '../../shared/components/top-bar/top-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [
    RegisterForm,
    BottomBar,
    TopBar
  ]
})
export class Register {}

/*function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor(
      "/src/templates/json/register-form.json",
      loadRegisterForm,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupTopBar(), setupRegisterForm()]).catch(console.error);
}

 */
