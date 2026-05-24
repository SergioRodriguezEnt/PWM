import {Component, computed, effect, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {OutfitService, Outfit} from '../../core/services/outfit.service';
import {FavoritesService} from '../../core/services/favorites.service';
import {AuthService} from '../../core/services/auth.service';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {PageShell} from '../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  host: { class: 'ion-page' },
  imports: [SearchResults, PageShell]
})
export class Favorites {
  private outfitService = inject(OutfitService);
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);

  private allOutfits = toSignal(this.outfitService.getAll(), { initialValue: [] as Outfit[] });
  private favoriteIds = signal<Set<string>>(new Set());

  favoriteOutfits = computed(() => {
    const ids = this.favoriteIds();
    return this.allOutfits().filter(o => ids.has(o.id));
  });

  constructor() {
    effect(async () => {
      const uid = this.authService.userId();
      if (!uid) {
        this.favoriteIds.set(new Set());
        return;
      }
      const ids = await this.favoritesService.getFavoriteIds();
      this.favoriteIds.set(new Set(ids));
    });
  }
}
