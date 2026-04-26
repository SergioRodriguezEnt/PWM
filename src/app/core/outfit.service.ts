import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Outfit {
  user: string;
  title: string;
  description: string;
  src: string;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class OutfitService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private outfitsCollection = collection(this.firestore, 'outfits');

  getOutfit(uid: string): Observable<Outfit | undefined> {
    return runInInjectionContext(this.injector, () => {
      const outfitDoc = doc(this.firestore, `outfits/${uid}`);
      return docData(outfitDoc) as Observable<Outfit | undefined>;
    });
  }

  getOutfits(): Observable<Outfit[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData(this.outfitsCollection) as Observable<Outfit[]>
    );
  }

  createOutfit(uid: string, outfit: Outfit): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const outfitDoc = doc(this.firestore, `outfits/${uid}`);
      return setDoc(outfitDoc, outfit);
    });
  }

  updateOutfit(uid: string, partial: Partial<Outfit>): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const outfitDoc = doc(this.firestore, `outfits/${uid}`);
      return updateDoc(outfitDoc, { ...partial });
    });
  }

  deleteOutfit(uid: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const outfitDoc = doc(this.firestore, `outfits/${uid}`);
      return deleteDoc(outfitDoc);
    });
  }
}
