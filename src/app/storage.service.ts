import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, collectionData, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference, doc } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  firestore = inject(Firestore);
  playerListCollection: CollectionReference;
  goodplayerlist$ = new BehaviorSubject<string[]>([]);
  badplayerlist$ = new BehaviorSubject<string[]>([]);

  destroyed$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.playerListCollection = collection(this.firestore, 'playerlists');
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.initialize();
      } else {
        this.destroyed$.next();
      }
    })
  }

  initialize() {
    collectionData(this.playerListCollection).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      const gpl = data[0]["goodplayerlist"];
      this.goodplayerlist$.next(gpl);
      const bpl = data[0]["badplayerlist"];
      this.badplayerlist$.next(bpl);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addGoodPlayer(newName: string) {
    const currArr = this.goodplayerlist$.value;
    currArr.push(newName);
    const document = doc(this.firestore, 'playerlists/lists');
    updateDoc(document, {
      goodplayerlist: currArr
    });
  }

  addBadPlayer(newName: string) {
    const currArr = this.badplayerlist$.value;
    currArr.push(newName);
    const document = doc(this.firestore, 'playerlists/lists');
    updateDoc(document, {
      badplayerlist: currArr
    });
  }

  removeGoodPlayer(oldName: string) {
    const currArr = this.goodplayerlist$.value.filter(name => name !== oldName);
    const document = doc(this.firestore, 'playerlists/lists');
    updateDoc(document, {
      goodplayerlist: currArr
    });
  }

  removeBadPlayer(oldName: string) {
    const currArr = this.badplayerlist$.value.filter(name => name !== oldName);
    const document = doc(this.firestore, 'playerlists/lists');
    updateDoc(document, {
      badplayerlist: currArr
    });
  }
}
