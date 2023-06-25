import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';
  @Output() searchWordEvent = new EventEmitter<string>();
  constructor() {}
  searchWord() {
    this.searchWordEvent.emit(this.search);
  }
}
