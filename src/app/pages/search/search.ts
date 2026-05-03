import {Component, computed, effect, inject, signal} from "@angular/core";
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {FloatingProfile} from '../../shared/components/floating-profile/floating-profile';
import {AuthService} from '../../core/services/auth.service';
import {Outfit, OutfitService} from '../../core/services/outfit.service';
import {User, UserService} from '../../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.css',
  imports: [
    SearchBar,
    SearchResults,
    FloatingProfile
  ]
})
export class Search {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private outfitService = inject(OutfitService);
  private userService = inject(UserService);

  isLoggedIn = this.authService.isLoggedIn;

  initialQuery = toSignal(
    this.route.queryParamMap.pipe(map(q => q.get('q') ?? '')),
    { initialValue: '' },
  );

  query = signal('');

  constructor() {
    effect(() => {
      this.query.set(this.initialQuery());
    });
  }

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
