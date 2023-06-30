import { Component, Input, ViewChildren } from '@angular/core';
import { from } from 'rxjs';
import { examples } from 'src/data';
import { AnkiManipulationService } from '../anki-manipulation.service';

@Component({
  selector: 'app-example-section',
  templateUrl: './example-section.component.html',
  styleUrls: ['./example-section.component.scss'],
})
export class ExampleSectionComponent {
  // Example properties
  @Input() wordNeedToLookUp: string = '';
  examples: any = [];
  finalExample = '';

  isLoadingData: boolean = true;

  @ViewChildren('example') example: any;

  constructor(private anki: AnkiManipulationService) {}

  ngOnChanges() {
    if (this.wordNeedToLookUp) {
      from(
        fetch(`http://localhost:3000/examples/${this.wordNeedToLookUp}`)
      ).subscribe(async (res) => {
        const a = await res.json();
        this.examples = a;
        this.isLoadingData = false;
      });
    }
  }

  exampleChange(e: any) {
    this.anki.setExample(e);
  }

  exampleClick(en: string, event: any) {
    if (this.finalExample === en) {
      this.finalExample = '';
      event.target.classList.remove('bg-slate-500', 'text-white');
      return;
    }
    this.finalExample = en;
    this.anki.setExample(this.finalExample);

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
