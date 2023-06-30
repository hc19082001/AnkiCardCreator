import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullWord } from 'src/data';
import { AnkiManipulationService } from '../anki-manipulation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-confirm-card',
  templateUrl: './modal-confirm-card.component.html',
  styleUrls: ['./modal-confirm-card.component.scss'],
})
export class ModalConfirmCardComponent {
  @Output() close = new EventEmitter<void>();
  fullWord: FullWord = {
    audioUrl: '',
    imageUrl: '',
    back: '',
    front: '',
    engDef: '',
    example: '',
    ipa: '',
    synonyms: '',
    wf: '',
  };
  exp: string = '';
  isLoading: boolean = false;
  isShowDeckOptions: boolean = false;
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.fullWord = this.anki.getWord();
    this.exp = this.fullWord.wf.replaceAll('<br>', '\n');
  }
  constructor(public anki: AnkiManipulationService) {}
  handleAddtoDeck() {
    this.isLoading = true;
    this.anki
      .addCard(this.anki.deckChoose, 'Flash Card', this.anki.getWord())
      .then((data) => {
        this.isLoading = false;
        if (data) {
          Swal.fire('Success', 'Added this word to Anki', 'success');
        } else {
          Swal.fire('Failed', 'Failed to add this word', 'error');
        }
      });
  }
}
