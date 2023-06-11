import { Component, ViewChild, ViewChildren } from '@angular/core';
import { words2 } from 'src/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AnkiCardCreator';
  data = words2;
  currentWord? = words2[0];

  finalViMeaning = '';
  finalEnMeaning = '';

  @ViewChildren('posbtn') posbtns: any;
  @ViewChildren('pvi') pvi: any;
  @ViewChildren('pen') pen: any;

  ngAfterViewInit(): void {
    // Set default button
    this.posbtns._results[0].nativeElement.classList.remove('bg-transparent');
    this.posbtns._results[0].nativeElement.classList.add(
      'text-white',
      'bg-slate-500',
      '-translate-y-3'
    );
  }

  onPosBtnClick(type: number, z: any) {
    // Change the current word
    this.currentWord = this.data.find((word) => word.type === type)!;
    // Reset all buttons to default except the one clicked
    this.posbtns._results.forEach((btn: any) => {
      if (btn.nativeElement.dataset.pos !== type) {
        btn.nativeElement.classList.add('bg-transparent');
        btn.nativeElement.classList.remove(
          'text-white',
          'bg-slate-500',
          '-translate-y-3'
        );
      }
    });
    // Change the clicked button
    z.srcElement.classList.remove('bg-transparent');
    z.srcElement.classList.add('text-white', 'bg-slate-500', '-translate-y-3');
  }

  enMeansClick(means: string, event: any) {
    this.finalEnMeaning = means;
    event.target.classList.add('bg-slate-500', 'text-white');
    this.pen._results.forEach((p: any) => {
      if (
        p.nativeElement.innerText !== means &&
        p.nativeElement.classList.contains('bg-slate-500', 'text-white')
      ) {
        p.nativeElement.classList.remove('bg-slate-500', 'text-white');
      }
    });
  }

  viMeansClick(means: string, event: any) {
    this.finalViMeaning = means;
    event.target.classList.add('bg-slate-500', 'text-white');
    this.pvi._results.forEach((p: any) => {
      if (
        p.nativeElement.innerText !== means &&
        p.nativeElement.classList.contains('bg-slate-500', 'text-white')
      ) {
        p.nativeElement.classList.remove('bg-slate-500', 'text-white');
      }
    });
  }
}
