import { Component, ViewChild, ViewChildren } from '@angular/core';
import { words2, examples } from 'src/data';
import { AnkiManipulationService } from './anki-manipulation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AnkiCardCreator';
  wordNeedToLookUp = '';
  isShowChooseSection: boolean = false;

  constructor(private anki: AnkiManipulationService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //^ Connect to Anki to get Decks information:
    this.anki.getAllDecksName().catch((err) => {
      Swal.fire({
        title: 'No connection',
        text: 'Please open Anki app and refresh page',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  }

  emitToComponents(event: any) {
    this.wordNeedToLookUp = event;
    this.isShowChooseSection = true;
  }
}
