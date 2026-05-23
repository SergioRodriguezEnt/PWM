import {Component, inject} from '@angular/core';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Outfit, OutfitService} from '../../core/services/outfit.service';
import {map} from 'rxjs';
import {IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    SearchResults,
    RouterLink,
    IonButton
  ]
})
export class Home {
  private outfitService = inject(OutfitService);

  outfits = toSignal(
    this.outfitService.getAll().pipe(map(all => all.slice(0, 8))), { initialValue: [] as Outfit[] });
}
