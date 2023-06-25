import { Component, ViewChild, ViewChildren } from '@angular/core';
import { words2, examples } from 'src/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AnkiCardCreator';
  wordNeedToLookUp = '';

  emitToComponents(event: any) {
    this.wordNeedToLookUp = event;
  }
}
