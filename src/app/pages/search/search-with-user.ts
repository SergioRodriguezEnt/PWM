import {Component, signal} from "@angular/core";
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {SideBar} from '../../shared/components/side-bar/side-bar';

@Component({
  selector: 'app-search-with-user',
  templateUrl: './search-with-user.html',
  imports: [
    SearchBar,
    SearchResults,
    BottomBar,
    ProfilePhoto,
    SideBar
  ],
  styleUrl: './search-with-user.css'
})
export class SearchWithUser{
}


/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupSideBar(),
    setupSearchBar(),
    setupSearchResults(),
    setupProfilePhoto(),
  ]).catch(console.error);
}
*/
