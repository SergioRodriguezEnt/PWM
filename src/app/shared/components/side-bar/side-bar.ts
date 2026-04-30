import {Component, computed, inject, signal} from '@angular/core';
import {NavigationEnd, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';
import {NotificationService, Notification as AppNotification} from '../../../core/services/notification.service';
import {OutfitService} from '../../../core/services/outfit.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {filter, map, of, startWith, switchMap} from 'rxjs';

type EditTarget = { type: 'profile' | 'outfit'; id: string } | null;

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class SideBar {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private outfitService = inject(OutfitService);
  private notificationService = inject(NotificationService);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  private editTarget = computed<EditTarget>(() => {
    const url = this.currentUrl() ?? '';
    const profileMatch = url.match(/^\/profile\/([^\/?]+)/);

    if (profileMatch) return { type: 'profile', id: profileMatch[1] };

    const outfitMatch = url.match(/^\/outfit\/([^\/?]+)/);

    if (outfitMatch) return { type: 'outfit', id: outfitMatch[1] };
    return null;
  });

  private currentUser = toSignal(
    toObservable(this.authService.userId).pipe(
      switchMap(uid => (uid ? this.userService.get(uid) : of(undefined))),
    ),
    { initialValue: undefined },
  );

  private viewedOutfit = toSignal(
    toObservable(this.editTarget).pipe(
      switchMap(t => (t?.type === 'outfit' ? this.outfitService.get(t.id) : of(undefined))),
    ),
    { initialValue: undefined },
  );

  private myNotifications$ = toObservable(this.authService.userId).pipe(
    switchMap(uid =>
      uid ? this.notificationService.getAll()
        .pipe(map(
          all => all.filter(n => n.userId === uid)
        )) : of([] as AppNotification[])
    )
  );

  showNotifications = signal(false);

  canEdit = computed(() => {
    const target = this.editTarget();
    const me = this.currentUser();

    if (!target || !me) return false;
    if (me.role === 'admin') return true;
    if (target.type === 'profile') return target.id === me.id;

    const outfit = this.viewedOutfit();

    return !!outfit && outfit.userId === me.id;
  });

  editLink = computed<(string | number)[] | null>(() => {
    const target = this.editTarget();

    if (!target) return null;

    return target.type === 'profile' ? ['update', target.id] : ['upload', target.id];
  });

  notifications = toSignal(this.myNotifications$, {
    initialValue: [] as AppNotification[],
  });

  hasNotifications = computed(() => this.notifications().length > 0);

  toggleNotifications() {
    this.showNotifications.update(v => !v);
  }

  closeNotifications() {
    this.showNotifications.set(false);
  }

  async clearAll() {
    const ns = this.notifications();
    await Promise.all(ns.map(n => this.notificationService.delete(n.id)));
  }

  async logout() {
    this.closeNotifications();
    await this.authService.logout();
    await this.router.navigate(['']);
  }
}
