import {firstValueFrom, take} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import { inject } from "@angular/core";
import {Auth, authState} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {OutfitService} from '../services/outfit.service';

export const OutfitEditGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const userService = inject(UserService);
  const outfitService = inject(OutfitService);

  const outfitId = route.paramMap.get('id') ?? '';
  if (!outfitId) return router.createUrlTree(['search']);

  const sessionAuth = await firstValueFrom(authState(auth).pipe(take(1)));
  if (!sessionAuth) return router.createUrlTree(['login']);

  const outfit = await firstValueFrom(outfitService.get(outfitId).pipe(take(1)));
  if (!outfit) return router.createUrlTree(['search']);

  if (outfit.userId === sessionAuth.uid) return true;

  const sessionUser = await firstValueFrom(userService.get(sessionAuth.uid).pipe(take(1)));
  if (sessionUser?.role === 'admin') return true;

  return router.createUrlTree(['outfit', outfitId]);
};
