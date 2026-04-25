import {Component} from "@angular/core";
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {SearchResults} from '../../shared/components/search-results/search-results';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    ProfilePhoto,
    SearchResults
  ],
  styleUrl: './profile.css'
})
export class Profile {
}

/*
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
