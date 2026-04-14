import {Component, signal} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {SideBar} from '../../shared/components/side-bar/side-bar';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    ProfilePhoto,
    SideBar,
    BottomBar,
    SearchResults
  ],
  styleUrl: './profile.css'
})
export class Profile {
}

/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/pages/json/profile.json", loadProfile),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupSideBar(),
    setupProfile(),
    setupProfilePhoto(),
    setupSearchResults(),
  ]).catch(console.error);
}

async function loadProfile(data) {
  let user_name = getParam("username");
  let user = await getUser(user_name);
  Promise.all([
    loadContentFor("#mini-avatar", "src", user, "profile-photo"),
    loadContentFor("#mini-avatar", "alt", data["mini-avatar"], "alt"),
    loadContentFor("#page-title", "textContent", user, "username"),
    loadSubtabs(data["subtabs"]),
  ]).catch(console.error);
}

async function loadSubtabs(data) {
  let subtabs = document.querySelectorAll(".subtab");
  let subtabData = 0;
  for (let elem of subtabs) {
    elem.textContent = data[subtabData++];
  }
}

async function setupProfile() {
  let profile_user = getParam("username");
  let user = getLocal("user");
  if (!user) {
    window.location.href = "../login/login.html";
    return;
  }
  if (user.username === profile_user || user.role === "admin") {
    document.getElementById("sidebar-extra-btn").classList.remove("hidden");
    setBtnRef(
      document,
      "#sidebar-extra-btn",
      "/PWM/src/pages/html/update.html?username=" + profile_user,
    );
    document.getElementById("boton-perfil").classList.add("hidden");
  }
}
*/
