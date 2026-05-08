import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonBadge, IonThumbnail
} from '@ionic/angular/standalone';
import {toSignal} from '@angular/core/rxjs-interop';
import {OutfitService, Outfit} from '../../core/services/outfit.service';
import {FavoritesService} from '../../core/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  imports: [
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge, IonThumbnail
  ]
})
export class Favorites implements OnInit {
  private outfitService = inject(OutfitService);
  private favoritesService = inject(FavoritesService);

  private allOutfits = toSignal(this.outfitService.getAll(), { initialValue: [] as Outfit[] });
  favoriteIds = signal<Set<string>>(new Set());

  outfitsWithFlag = computed(() => {
    const ids = this.favoriteIds();
    return this.allOutfits().map(o => ({
      ...o,
      isFavorite: ids.has(o.id)
    }));
  });

  async ngOnInit() {
    const ids = await this.favoritesService.getFavoriteIds();
    this.favoriteIds.set(new Set(ids));
  }
}
