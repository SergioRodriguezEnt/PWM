import {Injectable, inject, runInInjectionContext, Injector} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, authState} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private injector = inject(Injector);

  readonly isLoggedIn = toSignal(
    authState(this.auth).pipe(map(user => user != null)),
    { initialValue: false }
  );

  readonly userId = toSignal(
    authState(this.auth).pipe(map(user => user?.uid)),
    { initialValue: undefined }
  );

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return runInInjectionContext(this.injector, () =>
      createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  logout() {
    return signOut(this.auth);
  }
}
