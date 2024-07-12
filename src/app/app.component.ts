import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StringUtils } from './stringUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isGoodPlayerMode = false;

  searchControl = new FormControl();

  badPlayerList: Array<string> = [];
  goodPlayerList: Array<string> = [];
  findingsList: Array<string> = [];

  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.badPlayerList = this.getBadPlayerList();
    this.goodPlayerList = this.getGoodPlayerList();
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
    const arr = !this.isGoodPlayerMode ? this.badPlayerList : this.goodPlayerList;
    arr.splice(arr.indexOf(name), 1);
    const inFindingIdx = this.findingsList.indexOf(name);
    if (inFindingIdx >= 0) {
      this.findingsList.splice(inFindingIdx, 1);
    }
  }

  isAdded(name: string) {
    const value = name.toLowerCase();
    const arr = !this.isGoodPlayerMode ? this.badPlayerList : this.goodPlayerList;
    return StringUtils.arrayIncludes(arr, name);
  }

  addToList(name: string) {
    if (!this.isGoodPlayerMode) {
      this.badPlayerList.push(name);
    } else {
      this.goodPlayerList.push(name);
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

  getGoodPlayerList(): Array<string> {
    return ["Fabi"];
  }

  getBadPlayerList(): Array<string> {
    return ["Test1", "Test2", "Test3", "Test4", "Test5", "Maxi"];
  }
}
