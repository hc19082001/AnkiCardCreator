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
  finalWordFamily = '';

  @ViewChildren('wordFamily') wordFamily: any;

  constructor(private api: ApiConnectService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    from(this.api.getWordFamily('develop')).subscribe((res) => {
      this.data = res;
    });
  }

  wordFamilyClick(wf: string, event: any) {
    if (this.finalWordFamily === wf) {
      this.finalWordFamily = '';
      event.target.classList.remove('bg-slate-500', 'text-white');
      console.log(this.finalWordFamily);
      return;
    }
    this.finalWordFamily = wf;
    console.log(this.finalWordFamily);
    this.wordFamily._results.forEach((li: any) => {
      if (
        !li.nativeElement.contains(event.target) &&
        li.nativeElement.classList.contains('bg-slate-500', 'text-white')
      ) {
        li.nativeElement.classList.remove('bg-slate-500', 'text-white');
      }
    });
    event.target.classList.add('bg-slate-500', 'text-white');
  }
}
