import {Component, computed, inject} from "@angular/core";
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Outfit, OutfitService} from '../../core/services/outfit.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    ProfilePhoto,
    SearchResults
  ],
  styleUrl: './profile.css'
})
export class Profile {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private outfitService = inject(OutfitService);

  private id = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? '')),
    { initialValue: '' },
  );

  user = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => (id ? this.userService.get(id) : of(undefined))),
    ),
    { initialValue: undefined },
  );

  private allOutfits = toSignal(this.outfitService.getAll(), { initialValue: [] as Outfit[] });

  outfits = computed(() => {
    const id = this.id();
    return id ? this.allOutfits().filter(o => o.userId === id) : [];
  });
}
