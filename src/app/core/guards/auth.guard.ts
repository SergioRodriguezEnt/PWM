import {CanActivateFn, Router} from "@angular/router";
import {inject} from '@angular/core';
import {Auth, authState} from '@angular/fire/auth';
import {firstValueFrom, take} from 'rxjs';

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = await firstValueFrom(authState(auth).pipe(take(1)));
  if (user) return true;

  return router.createUrlTree(['login']);
};
