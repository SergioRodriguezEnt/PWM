import { Component } from '@angular/core';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    SearchResults,
    RouterLink
  ]
})
export class Home {

}
