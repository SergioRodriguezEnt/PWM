import {computed, Injectable, signal} from '@angular/core';

export interface User {
  name: String;
  photoSrc: String;
  role: "admin" | "user";
}

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly STORAGE_KEY = "user";

  private _user = signal<User | null>(this.loadFromStorage());

  // Public readonly signal
  readonly user = this._user.asReadonly();

  // Derived signals
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  logIn(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  logOut(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._user.set(null);
  }

  private loadFromStorage(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
