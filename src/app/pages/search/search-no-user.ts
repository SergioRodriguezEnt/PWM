import {Component, signal} from "@angular/core";

@Component({
  selector: 'app-search-no-user',
  templateUrl: './search-no-user.html',
  styleUrl: './search-no-user.css'
})
export class SearchNoUser{
}

/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupTopBar(), setupSearchBar(), setupSearchResults()]).catch(
    console.error,
  );
}
*/
