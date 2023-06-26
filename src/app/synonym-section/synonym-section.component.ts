import { Component, Input, ViewChildren } from '@angular/core';
import { synonyms } from 'src/data';
import { from } from 'rxjs';
import { ApiConnectService } from '../api-connect.service';
import { AnkiManipulationService } from '../anki-manipulation.service';

@Component({
  selector: 'app-synonym-section',
  templateUrl: './synonym-section.component.html',
  styleUrls: ['./synonym-section.component.scss'],
})
export class SynonymSectionComponent {
  @Input() wordNeedToLookUp: string = '';
  data: string[] = [];

  finalSynonyms: string[] = [];
  finalSynonymString: string = '';

  constructor(
    private api: ApiConnectService,
    private anki: AnkiManipulationService
  ) {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    from(this.api.getSynonymLacViet(this.wordNeedToLookUp)).subscribe((res) => {
      this.data = res;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    from(this.api.getSynonymLacViet(this.wordNeedToLookUp)).subscribe((res) => {
      this.data = res;
    });
  }

  synonymStringChange(synonymString: any) {
    const tmp = synonymString.target.value.split('_');
    const filternull = tmp.filter((word: string) => word !== '');
    this.finalSynonyms = filternull;
    this.anki.setSynonyms(this.finalSynonyms.join(', '));
  }

  synonymClick(synonym: string) {
    const isFindThisWord = this.finalSynonyms.find(
      (item) => item.trim() === synonym.trim()
    );
    if (isFindThisWord) {
      this.finalSynonyms.splice(this.finalSynonyms.indexOf(synonym.trim()), 1);
    } else {
      this.finalSynonyms.push(synonym.trim());
    }

    this.finalSynonymString = this.finalSynonyms.join('_');
    console.log('FinalStringWhenChooseRadio: ' + this.finalSynonymString);
    this.anki.setSynonyms(this.finalSynonyms.join(', '));
    console.log(this.anki.getWord());
  }

  // synonymStringChange(synonymString: any) {
  //   const listWords = synonymString.target.value.split('-');
  //   console.log(listWords);
  //   listWords.forEach((word: string) => {
  //     if (word === '') {
  //       listWords.splice(listWords.indexOf(word.trim()), 1);
  //     }
  //   });
  //   this.finalSynonyms = listWords;
  //   this.anki.setSynonyms(this.finalSynonyms.join(', '));
  // }
}
