import { Component, EventEmitter, Output } from '@angular/core';
import { AnkiManipulationService } from '../anki-manipulation.service';
import { ApiConnectService } from '../api-connect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';
  @Output() searchWordEvent = new EventEmitter<string>();
  constructor(
    private anki: AnkiManipulationService,
    private api: ApiConnectService
  ) {}
  searchWord() {
    this.anki.setFront(this.search.toLowerCase().trim());
    this.api.getMeanOfWord(this.search.toLowerCase().trim()).then((data) => {
      if (data.defs.length > 0) {
        this.searchWordEvent.emit(this.search.toLowerCase().trim());
      } else {
        this.searchWordEvent.emit('');
        Swal.fire({
          title: "Can't find this word",
          toast: true,
          text: 'But you can edit the fields yourself below',
          icon: 'error',
          timer: 5000,
          showConfirmButton: true,
          timerProgressBar: true,
        });
      }
    });
  }
}
