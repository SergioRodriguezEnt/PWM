import {Component, computed, inject} from "@angular/core";
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';
import {SearchResults} from '../../shared/components/search-results/search-results';
import {FloatingProfile} from '../../shared/components/floating-profile/floating-profile';
import {ActivatedRoute} from '@angular/router';
import {User, UserService} from '../../core/services/user.service';
import {Outfit, OutfitService} from '../../core/services/outfit.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';

interface UserState {
  loaded: boolean;
  value: User | undefined;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    ProfilePhoto,
    SearchResults,
    FloatingProfile
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

  private userState = toSignal<UserState, UserState>(
    toObservable(this.id).pipe(
      switchMap(id =>
        id
          ? this.userService.get(id).pipe(map(value => ({ loaded: true, value })))
          : of<UserState>({ loaded: false, value: undefined }),
      ),
    ),
    { initialValue: { loaded: false, value: undefined } as UserState},
  );

  user = computed(() => this.userState().value);
  loading = computed(() => !this.userState().loaded);
  notFound = computed(() => {
    const s = this.userState();
    return s.loaded && !s.value;
  });

  private allOutfits = toSignal(this.outfitService.getAll(), { initialValue: [] as Outfit[] });

  outfits = computed(() => {
    const id = this.id();
    return id ? this.allOutfits().filter(o => o.userId === id) : [];
  });
}
