import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {OutfitService, Outfit} from '../../core/services/outfit.service';
import {FavoritesService} from '../../core/services/favorites.service';
import {SearchResults} from '../../shared/components/search-results/search-results';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  imports: [SearchResults]
})
export class Favorites implements OnInit {
  private outfitService = inject(OutfitService);
  private favoritesService = inject(FavoritesService);

  private allOutfits = toSignal(this.outfitService.getAll(), { initialValue: [] as Outfit[] });
  private favoriteIds = signal<Set<string>>(new Set());

  favoriteOutfits = computed(() => {
    const ids = this.favoriteIds();
    return this.allOutfits().filter(o => ids.has(o.id));
  });

  async ngOnInit() {
    const ids = await this.favoritesService.getFavoriteIds();
    this.favoriteIds.set(new Set(ids));
  }
}
