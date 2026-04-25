import {Component} from "@angular/core";
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  imports: [
    SearchBar,
    SearchResults,
    ProfilePhoto
  ]
})
export class Search {

}
