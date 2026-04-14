import {Component} from '@angular/core';
import {OutfitView} from './outfit.view';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.html',
  styleUrl: './outfit.css',
  imports: [
    OutfitView
  ]
})
export class Outfit {

}
/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
    loadDynamicContentFor("/src/resources/outfits.json", loadOutfitView),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupTopBar(), setupSearchBar(), setupOutfitView()]).catch(
    console.error,
  );
}*/
