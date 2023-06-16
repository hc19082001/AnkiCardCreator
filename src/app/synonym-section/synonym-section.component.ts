import { Component, ViewChildren } from '@angular/core';
import { synonyms } from 'src/data';

@Component({
  selector: 'app-synonym-section',
  templateUrl: './synonym-section.component.html',
  styleUrls: ['./synonym-section.component.scss'],
})
export class SynonymSectionComponent {
  data: string[] = synonyms;

  finalSynonyms: string[] = [];
  finalSynonymString: string = '';

  synonymClick(synonym: string) {
    this.finalSynonyms.find((item) => item === synonym)
      ? this.finalSynonyms.splice(this.finalSynonyms.indexOf(synonym), 1)
      : this.finalSynonyms.push(synonym);
    this.finalSynonymString = this.finalSynonyms.join('-');
    console.log(this.finalSynonyms);
  }
  synonymStringChange(synonymString: any) {
    const listWords = synonymString.target.value.split('-');
    listWords.forEach((word: string) => {
      if (word === '') {
        listWords.splice(listWords.indexOf(word), 1);
      }
    });
    this.finalSynonyms = listWords;
    console.log(this.finalSynonyms);
  }
}
