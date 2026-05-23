import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { combineLatest, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { OutfitService, Outfit as OutfitModel } from '../../core/services/outfit.service';
import { UserService } from '../../core/services/user.service';
import { CommentService, Comment as OutfitComment } from '../../core/services/comment.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProfilePhoto } from '../../shared/components/profile-photo/profile-photo';
import { FloatingProfile } from '../../shared/components/floating-profile/floating-profile';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {NgOptimizedImage} from '@angular/common';
import {FavoritesService} from '../../core/services/favorites.service';
import {IonButton, IonChip, IonFab, IonFabButton, IonIcon, IonInput} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {heart, heartOutline} from 'ionicons/icons';

interface CommentWithAuthor extends OutfitComment {
  authorName?: string;
  authorPhoto?: string;
}

interface OutfitState {
  loaded: boolean;
  value: OutfitModel | undefined;
}

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.html',
  styleUrls: ['./outfit.css'],
  imports: [
    SearchBar,
    RouterLink,
    ProfilePhoto,
    FloatingProfile,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInput,
    IonButton,
    IonChip
  ]
})
export class Outfit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private outfitService = inject(OutfitService);
  private userService = inject(UserService);
  private commentService = inject(CommentService);
  private notificationService = inject(NotificationService);
  private favoritesService = inject(FavoritesService);

  isLoggedIn = this.authService.isLoggedIn;
  isFavorite = signal(false);

  constructor() {
    addIcons({ heart, heartOutline });

    effect(async () => {
      const id = this.id();
      const uid = this.authService.userId();
      if (id && uid) {
        const fav = await this.favoritesService.isFavorite(id);
        this.isFavorite.set(fav);
      } else {
        this.isFavorite.set(false);
      }
    });
  }

  async toggleFavorite() {
    const id = this.id();
    if (!id) return;
    if (this.isFavorite()) {
      await this.favoritesService.removeFavorite(id);
    } else {
      await this.favoritesService.addFavorite(id);
    }
    this.isFavorite.update(v => !v);
  }

  private id = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? '')), { initialValue: '' }
  );

  private outfitState = toSignal<OutfitState, OutfitState>(
    toObservable(this.id).pipe(
      switchMap(id =>
        id
          ? this.outfitService.get(id).pipe(map(value => ({ loaded: true, value })))
          : of<OutfitState>({ loaded: false, value: undefined }),
      ),
    ),
    { initialValue: { loaded: false, value: undefined } },
  );

  outfit = computed(() => this.outfitState().value);
  loading = computed(() => !this.outfitState().loaded);
  notFound = computed(() => {
    const s = this.outfitState();
    return s.loaded && !s.value;
  });

  author = toSignal(
    toObservable(this.outfit).pipe(
      switchMap(o => (o?.userId ? this.userService.get(o.userId) : of(undefined)))
    ),
    { initialValue: undefined },
  );

  private comments$ = toObservable(this.id).pipe(
    switchMap(id =>
      id ? combineLatest([
        this.commentService.getAll().pipe(
          map(all => all.filter(c => c.outfitId === id)),
        ),
        this.userService.getAll(),
      ]).pipe(
        map(([comments, users]) => {
          const usersById = new Map(users.map(u => [u.id, u]));
          return comments.map<CommentWithAuthor>(c => ({
            ...c,
            authorName: usersById.get(c.userId)?.name,
            authorPhoto: usersById.get(c.userId)?.profileSrc,
          }));
        }),
      )
      : of([] as CommentWithAuthor[]),
    ),
  );
  comments = toSignal(this.comments$, { initialValue: [] as CommentWithAuthor[] });

  commentControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });
  posting = signal(false);
  postError = signal<string | null>(null);

  async addComment() {
    const text = this.commentControl.value.trim();
    const outfit = this.outfit();
    const myId = this.authService.userId();
    if (!text || !outfit || !myId) return;

    this.posting.set(true);
    this.postError.set(null);

    try {
      await this.commentService.create({
        outfitId: outfit.id,
        userId: myId,
        comment: text,
      });
    } catch (e: unknown) {
      this.postError.set(
        e instanceof Error ? e.message : 'Could not post comment',
      );
      this.posting.set(false);
      return;
    }

    this.commentControl.reset('');

    if (outfit.userId !== myId) {
      try {
        await this.notificationService.create({
          userId: outfit.userId,
          message: `New comment on your outfit "${outfit.title}"`,
          outfitId: outfit.id,
        });
      } catch (e) {
        console.warn('Failed to create notification', e);
      }
    }

    this.posting.set(false);
  }

  async onSearch(query: string) {
    await this.router.navigate(['search'], {
      queryParams: query ? { q: query } : {},
    });
  }
}
