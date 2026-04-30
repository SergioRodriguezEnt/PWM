import {Component, computed, inject, signal} from "@angular/core";
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {AuthService} from '../../core/services/auth.service';
import {Outfit, OutfitService} from '../../core/services/outfit.service';
import {User, UserService} from '../../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.css',
  imports: [
    SearchBar,
    SearchResults,
    ProfilePhoto
  ]
})
export class Search {
  private authService = inject(AuthService);
  private outfitService = inject(OutfitService);
  private userService = inject(UserService);

  isLoggedIn = this.authService.isLoggedIn;

  /*
  TODO Add required methods/fields to complete the required fields for the profile-photo component in the html
   */

  query = signal('');

  private outfits = toSignal(this.outfitService.getAll(), {
    initialValue: [] as Outfit[],
  });
  private users = toSignal(this.userService.getAll(), {
    initialValue: [] as User[],
  });

  results = computed<Outfit[]>(() => {
    const q = this.query().toLowerCase().trim();
    const all = this.outfits();
    if (!q) return all;

    const matchingUserIds = new Set(
      this.users()
        .filter(u => u.name?.toLowerCase().includes(q))
        .map(u => u.id),
    );

    return all.filter(
      o =>
        o.title?.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q) ||
        o.tags?.some(t => t.toLowerCase().includes(q)) ||
        matchingUserIds.has(o.userId),
    );
  });

  onSearch(q: string) {
    this.query.set(q);
  }
}
