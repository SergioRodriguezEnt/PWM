import {Injectable, inject, computed} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, authState} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private user = toSignal(authState(this.auth), {initialValue: null})

  readonly isLoggedIn = computed(() => this.user() != null);
  readonly userId = computed(() => this.user()?.uid);

  async login(email: string, password: string): Promise<string> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return cred.user.uid;
  }

  async register(email: string, password: string): Promise<string> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    return cred.user.uid;
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  async deleteCurrentUser(): Promise<void> {
    const current = this.auth.currentUser;
    if (current) await current.delete();
  }
}
