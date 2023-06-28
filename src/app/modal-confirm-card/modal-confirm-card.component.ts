import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullWord } from 'src/data';
import { AnkiManipulationService } from '../anki-manipulation.service';

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
  textBtn: string = '';
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.fullWord = this.anki.getWord();
    this.exp = this.fullWord.wf.replaceAll('<br>', '\n');
    this.textBtn = this.anki.deckChoose
      ? `Add to [${this.anki.deckChoose}]`
      : 'PLEASE CHOOSE DECK FIRST';
  }
  constructor(private anki: AnkiManipulationService) {}
}
