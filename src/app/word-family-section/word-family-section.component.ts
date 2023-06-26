import { Component, Input, ViewChildren } from '@angular/core';
import { ApiConnectService } from '../api-connect.service';
import { word_family } from 'src/data';
import { from } from 'rxjs';
import { AnkiManipulationService } from '../anki-manipulation.service';
@Component({
  selector: 'app-word-family-section',
  templateUrl: './word-family-section.component.html',
  styleUrls: ['./word-family-section.component.scss'],
})
export class WordFamilySectionComponent {
  @Input() wordNeedToLookUp: string = '';
  data: string[] = [];
  finalWordFamily: string[] = [];
  finalWordFamilyString: string = '';

  @ViewChildren('wordFamily') wordFamily: any;

  constructor(
    private api: ApiConnectService,
    private anki: AnkiManipulationService
  ) {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    from(this.api.getWordFamily(this.wordNeedToLookUp)).subscribe((res) => {
      this.data = res;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    from(this.api.getWordFamily(this.wordNeedToLookUp)).subscribe((res) => {
      this.data = res;
    });
  }

  wordFamilyClick(wf: string) {
    this.finalWordFamilyString += wf + '\n';
    this.finalWordFamily.push(wf + '. <br>');
    this.anki.setWf(this.finalWordFamily.join(''));
    console.log(this.finalWordFamily);
    console.log(this.finalWordFamilyString);
    console.log(this.anki.getWord());
  }
  onWordFamilyChange(event: any) {
    this.finalWordFamilyString = event.target.value;
    this.finalWordFamily = event.target.value
      .split('\n')
      .join('. <br>@$%')
      .split('@$%')
      .filter((x: string) => x !== '' && x !== '. <br>');
    console.log(this.finalWordFamilyString);
    this.anki.setWf(this.finalWordFamily.join(''));
    console.log(this.anki.getWord());
  }
}
