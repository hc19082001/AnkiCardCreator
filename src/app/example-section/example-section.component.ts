import { Component, ViewChildren } from '@angular/core';
import { examples } from 'src/data';

@Component({
  selector: 'app-example-section',
  templateUrl: './example-section.component.html',
  styleUrls: ['./example-section.component.scss'],
})
export class ExampleSectionComponent {
  // Example properties
  examples = examples;
  finalExample = '';

  @ViewChildren('example') example: any;

  exampleClick(en: string, event: any) {
    if (this.finalExample === en) {
      this.finalExample = '';
      event.target.classList.remove('bg-slate-500', 'text-white');
      console.log(this.finalExample);
      return;
    }
    this.finalExample = en;
    console.log(this.finalExample);
    this.example._results.forEach((li: any) => {
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
