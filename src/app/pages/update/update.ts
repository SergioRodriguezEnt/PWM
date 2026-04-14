import { Component } from '@angular/core';
import {EditProfileForm} from './edit-profile-form';
import {SideBar} from '../../shared/components/side-bar/side-bar';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.html',
  styleUrl: './update.css',
  imports: [
    EditProfileForm,
    SideBar,
    BottomBar
  ]
})
export class Update {}

/* async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/templates/json/edit-profile-form.json",
      loadEditProfileForm,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar(), setupEditProfileForm()]).catch(console.error);
}
 */
