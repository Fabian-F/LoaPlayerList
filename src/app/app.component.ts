import { FormControl } from '@angular/forms';
import { StringUtils } from './stringUtils';
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { faFaceSmileBeam, faPoo, faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  loggedIn = false;
  isGoodPlayerMode = false;
  faTrashCan = faTrashCan;
  faUserPlus = faUserPlus;
  faFaceSmileBeam = faFaceSmileBeam;
  faPoo = faPoo;

  searchControl = new FormControl();

  badPlayerList: Array<string> = [];
  goodPlayerList: Array<string> = [];
  findingsList: Array<string> = [];

  destroyed$ = new Subject<void>();

  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService, private storageService: StorageService) {
    this.authService.authState$.subscribe((aUser: any | null) => {
      this.loggedIn = aUser !== null;
    });
    this.storageService.goodplayerlist$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.goodPlayerList = data;
      this.onInput();
    });
    this.storageService.badplayerlist$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.badPlayerList = data;
      this.onInput();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  switchPlayerMode() {
    this.isGoodPlayerMode = !this.isGoodPlayerMode;
    this.onInput();
  }

  onAdd() {
    const value = StringUtils.toTitleCase(this.searchControl.value);
    this.addToList(value);
    this.searchControl.reset();
    this.searchInput.nativeElement.focus();
  }

  onDelete(name: string) {
    if (!this.isGoodPlayerMode) {
      this.storageService.removeBadPlayer(name);
    } else {
      this.storageService.removeGoodPlayer(name);
    }
  }

  onLogout() {
    this.authService.logout();
  }

  isAdded(name: string) {
    const value = name.toLowerCase();
    const arr = !this.isGoodPlayerMode ? this.badPlayerList : this.goodPlayerList;
    return StringUtils.arrayIncludes(arr, name);
  }

  addToList(name: string) {
    if (!this.isGoodPlayerMode) {
      this.storageService.addBadPlayer(name);
    } else {
      this.storageService.addGoodPlayer(name);
    }
  }

  onInput() {
    const value = this.searchControl.value;
    if (!value) {
      this.findingsList = [];
      return;
    }
    this.findPlayers(value.toLowerCase());
  }

  findPlayers(input: string) {
    const searchArr = !this.isGoodPlayerMode ? this.badPlayerList : this.goodPlayerList;
    this.findingsList = searchArr.filter(name => name.toLowerCase().includes(input))
  }
}
