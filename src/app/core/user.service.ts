import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface User {
  email: string;
  name: string;
  photoSrc: string;
  role: "admin" | "user";
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private usersRef = collection(this.firestore, 'users');

  getUsers(): Observable<User[]> {
    return collectionData(this.usersRef, { idField: 'email' }) as Observable<User[]>;
  }

  addUser(user: User) {
    return addDoc(this.usersRef, user);
  }

  updateUser(email: string, data: Partial<User>) {
    return updateDoc(doc(this.firestore, 'users', email), data);
  }

  deleteUser(email: string) {
    return deleteDoc(doc(this.firestore, 'items', email));
  }
}
