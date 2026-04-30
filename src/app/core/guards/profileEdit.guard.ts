import {firstValueFrom, take} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth, authState} from '@angular/fire/auth';
import {UserService} from '../services/user.service';

export const ProfileEditGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const userService = inject(UserService);

  const profileId = route.paramMap.get('id') ?? '';
  if (!profileId) return router.createUrlTree(['search']);

  const sessionAuth = await firstValueFrom(authState(auth).pipe(take(1)));
  if (!sessionAuth) return router.createUrlTree(['login']);

  if (sessionAuth.uid === profileId) return true;

  const sessionUser = await firstValueFrom(userService.get(sessionAuth.uid).pipe(take(1)));
  if (sessionUser?.role === 'admin') return true;

  return router.createUrlTree(['profile', profileId]);
};
