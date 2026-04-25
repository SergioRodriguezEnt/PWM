import {Injectable, inject, signal} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, authState} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  readonly isLoggedIn = toSignal(
    authState(this.auth).pipe(map(user => user != null)),
    { initialValue: false }
  );

  readonly userId = signal(this.auth.currentUser?.uid).asReadonly()

  getEmail() : string {
    return this.auth.currentUser?.email ?? '';
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
