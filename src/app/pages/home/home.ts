import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/pages/json/home.json", loadHome),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupTopBar(), setupHome(), setupSearchResults()]).catch(
    console.error,
  );
}

async function loadHome(data) {
  await loadContentFor(".main-span", "textContent", data, "textContent");
  await loadContentFor("#search-btn", "textContent", data, "search-btn");
}

async function setupHome() {
  if (getParam("logout") === "true") {
    setLocal("user", null);
  }
  setBtnRef(document, "#search-btn", "/PWM/src/pages/html/search-no-user.html");
}*/
