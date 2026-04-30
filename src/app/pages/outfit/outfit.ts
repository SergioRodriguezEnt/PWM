import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { combineLatest, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { OutfitService } from '../../core/services/outfit.service';
import { UserService } from '../../core/services/user.service';
import { CommentService, Comment as OutfitComment } from '../../core/services/comment.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProfilePhoto } from '../../shared/components/profile-photo/profile-photo';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {NgOptimizedImage} from '@angular/common';

interface CommentWithAuthor extends OutfitComment {
  authorName?: string;
  authorPhoto?: string;
}

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.html',
  styleUrls: ['./outfit.css'],
  imports: [
    SearchBar,
    RouterLink,
    ProfilePhoto,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class Outfit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private outfitService = inject(OutfitService);
  private userService = inject(UserService);
  private commentService = inject(CommentService);
  private notificationService = inject(NotificationService);

  isLoggedIn = this.authService.isLoggedIn;

  private id = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? '')), { initialValue: '' }
  );

  outfit = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => (id ? this.outfitService.get(id) : of(undefined)))
    ),
    { initialValue: undefined },
  );

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

      if (outfit.userId !== myId) {
        await this.notificationService.create({
          userId: outfit.userId,
          message: `New comment on your outfit "${outfit.title}"`,
        });
      }

      this.commentControl.reset('');
    } catch (e: unknown) {
      this.postError.set(
        e instanceof Error ? e.message : 'Could not post comment',
      );
    } finally {
      this.posting.set(false);
    }
  }
}
