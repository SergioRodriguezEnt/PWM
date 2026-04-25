import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc, docData,
  Firestore,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';

export interface User {
  email: string;
  description: string;
  name: string;
  profilePhotoSrc: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');

  /** Fetch a single user by UID as a one-time read. */
  getUser(uid: string): Observable<User | undefined> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return docData(userDoc) as Observable<User | undefined>;
  }

  /** Stream all users in the collection in real time. */
  getUsers(): Observable<User[]> {
    return collectionData(this.usersCollection) as Observable<User[]>;
  }

  /** Create a new user document. The UID should come from Firebase Auth. */
  createUser(uid: string, user: User): Observable<void> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(setDoc(userDoc, user));
  }

  /** Partially update an existing user document. */
  updateUser(uid: string, partial: Partial<User>): Observable<void> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(updateDoc(userDoc, { ...partial }));
  }

  /** Delete a user document by UID. */
  deleteUser(uid: string): Observable<void> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(deleteDoc(userDoc));
  }
}
