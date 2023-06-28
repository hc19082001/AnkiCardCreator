import { Component, EventEmitter, Output, ViewChildren } from '@angular/core';
import { AnkiManipulationService } from '../anki-manipulation.service';

@Component({
  selector: 'app-modal-choose-deck',
  templateUrl: './modal-choose-deck.component.html',
  styleUrls: ['./modal-choose-deck.component.scss'],
})
export class ModalChooseDeckComponent {
  data: string[] = [];
  deckChoose: string = '';

  @ViewChildren('deck') decks: any;
  constructor(private anki: AnkiManipulationService) {}

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.body.style.overflow = 'hidden';
    this.anki.invoke('deckNames').then((data) => {
      this.data = data.result;
    });
    this.deckChoose = this.anki.deckChoose;
  }

  onSelectDeck(deckName: string, event: any) {
    this.deckChoose = deckName;
    this.anki.setDeckChoose(deckName);
    this.decks._results.forEach((element: any) => {
      if (element.nativeElement.innerText === deckName) {
        element.nativeElement.classList.add('bg-amber-500', 'font-semibold');
      } else {
        element.nativeElement.classList.remove('bg-amber-500', 'font-semibold');
      }
    });
  }
}
