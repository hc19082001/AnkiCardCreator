import { Component, ViewChildren } from '@angular/core';
import { ApiConnectService } from '../api-connect.service';
import { word_family } from 'src/data';
import { from } from 'rxjs';
@Component({
  selector: 'app-word-family-section',
  templateUrl: './word-family-section.component.html',
  styleUrls: ['./word-family-section.component.scss'],
})
export class WordFamilySectionComponent {
  data: string[] = [];
  finalWordFamily: string[] = [];
  finalWordFamilyString: string = '';

  @ViewChildren('wordFamily') wordFamily: any;

  constructor(private api: ApiConnectService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    from(this.api.getWordFamily('love')).subscribe((res) => {
      this.data = res;
    });
  }

  wordFamilyClick(wf: string) {
    this.finalWordFamilyString += wf + '\n';
    this.finalWordFamily.push(wf + '. <br>');
    console.log(this.finalWordFamily);
  }
  onWordFamilyChange(event: any) {
    this.finalWordFamilyString = event.target.value;
    this.finalWordFamily = event.target.value
      .split('\n')
      .join('. <br>@$%')
      .split('@$%')
      .filter((x: string) => x !== '' && x !== '. <br>');
    console.log(this.finalWordFamily);
  }
}
