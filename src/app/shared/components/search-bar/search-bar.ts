import {Component} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

}
/*async function loadSearchBar(data) {
  Promise.all([
    loadContentFor(".searchbar-input", "placeholder", data, "searchbar-label"),
    loadContentFor(".searchbar-btn", "textContent", data, "searchbar-btn"),
  ]).catch(console.error);
}

async function setupSearchBar() {
  setBtnRef(document, ".searchbar-btn", "/PWM/src/pages/html/home.html");
}
*/
