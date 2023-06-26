import { Component, EventEmitter, Output } from '@angular/core';
import { AnkiManipulationService } from '../anki-manipulation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';
  @Output() searchWordEvent = new EventEmitter<string>();
  constructor(private anki: AnkiManipulationService) {}
  searchWord() {
    this.anki.setFront(this.search.toLowerCase().trim());
    this.searchWordEvent.emit(this.search);
  }
}
