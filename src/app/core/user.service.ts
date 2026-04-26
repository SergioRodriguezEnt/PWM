import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore, query,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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
  private injector = inject(Injector);
  private usersCollection = collection(this.firestore, 'users');

  getUser(uid: string): Observable<User | undefined> {
    return runInInjectionContext(this.injector, () => {
      const userDoc = doc(this.firestore, `users/${uid}`);
      return docData(userDoc) as Observable<User | undefined>;
    });
  }

  getUsers(): Observable<User[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData(query(this.usersCollection)) as Observable<User[]>
    );
  }

  createUser(uid: string, user: User): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const userDoc = doc(this.firestore, `users/${uid}`);
      return setDoc(userDoc, user);
    });
  }

  updateUser(uid: string, partial: Partial<User>): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const userDoc = doc(this.firestore, `users/${uid}`);
      return updateDoc(userDoc, { ...partial });
    });
  }

  deleteUser(uid: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const userDoc = doc(this.firestore, `users/${uid}`);
      return deleteDoc(userDoc);
    });
  }
}
