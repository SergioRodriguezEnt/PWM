import {Injectable, signal} from '@angular/core';

export class User {
  name: String;
  photoSrc: String;

  constructor(name: String, photoSrc: String) {
    this.name = name;
    this.photoSrc = photoSrc;
  }
}

@Injectable({providedIn: 'root'})
export class UserService {
  isLogged = signal(localStorage.getItem("user") != null)

  user(): User {
    return JSON.parse(<string>localStorage.getItem("user"))
  }

  logIn(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  logOut() {
    localStorage.removeItem("user");
  }
}
