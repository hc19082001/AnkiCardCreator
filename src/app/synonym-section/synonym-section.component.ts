import { Component, ViewChildren } from '@angular/core';
import { synonyms } from 'src/data';
import { from } from 'rxjs';
import { ApiConnectService } from '../api-connect.service';

@Component({
  selector: 'app-synonym-section',
  templateUrl: './synonym-section.component.html',
  styleUrls: ['./synonym-section.component.scss'],
})
export class SynonymSectionComponent {
  data: string[] = [];

  finalSynonyms: string[] = [];
  finalSynonymString: string = '';

  constructor(private api: ApiConnectService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    from(this.api.getSynonym('develop')).subscribe((res) => {
      this.data = res;
    });
  }

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
