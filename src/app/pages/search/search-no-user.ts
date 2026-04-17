import {Component, signal} from "@angular/core";
import {TopBar} from '../../shared/components/top-bar/top-bar';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';

@Component({
  selector: 'app-search-no-user',
  templateUrl: './search-no-user.html',
  imports: [
    TopBar,
    SearchBar,
    SearchResults
  ]
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
