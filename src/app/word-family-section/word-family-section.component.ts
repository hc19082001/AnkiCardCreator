import { Component, ViewChildren } from '@angular/core';
import { word_family } from 'src/data';

@Component({
  selector: 'app-word-family-section',
  templateUrl: './word-family-section.component.html',
  styleUrls: ['./word-family-section.component.scss'],
})
export class WordFamilySectionComponent {
  data: string[] = word_family;
  finalWordFamily = '';

  @ViewChildren('wordFamily') wordFamily: any;

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
