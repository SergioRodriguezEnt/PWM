import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut,
  createUserWithEmailAndPassword, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  user$ = user(this.auth); // Observable of the current user (null if logged out)

  getEmail() : string {
    return <string>this.auth.currentUser?.email
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser != null;
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
