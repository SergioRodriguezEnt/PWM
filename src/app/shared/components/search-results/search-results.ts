import {Component, input} from '@angular/core';
import {Outfit} from '../../../core/services/outfit.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
  imports: [
    RouterLink
  ]
})
export class SearchResults {
  outfits = input.required<Outfit[]>();
}
