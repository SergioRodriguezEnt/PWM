import { inject } from "@angular/core";
import {
  collection,
  Firestore,
  CollectionReference,
  doc,
  setDoc,
  docData,
  collectionData,
  updateDoc,
  deleteDoc,
  UpdateData
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

export abstract class CrudService<T extends { id: string }> {
  protected firestore = inject(Firestore);
  protected collectionRef: CollectionReference;

  protected constructor(collectionName: string) {
    this.collectionRef = collection(this.firestore, collectionName);
  }

  async create(data: Omit<T, 'id'>, id?: string): Promise<string> {
    const docRef = id ? doc(this.collectionRef, id) : doc(this.collectionRef);
    await setDoc(docRef, data);
    return docRef.id
  }

  get(id: string): Observable<T | undefined> {
    const docRef = doc(this.collectionRef, id);
    return docData(docRef, { idField: 'id' }) as Observable<T | undefined>;
  }

  getAll(): Observable<T[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<T[]>;
  }

  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    return updateDoc(docRef, data as UpdateData<T>);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    return deleteDoc(docRef);
  }
}
