import { Component, ViewChildren, AfterViewInit, Input } from '@angular/core';
import { Mean, Word } from 'src/data';
import { ApiConnectService } from '../api-connect.service';
import { Observable, interval, map, from } from 'rxjs';
import { AnkiManipulationService } from '../anki-manipulation.service';
import * as e from 'express';
import { getTypeReverse } from 'src/tools/POSHandle';

@Component({
  selector: 'app-meaning-section',
  templateUrl: './meaning-section.component.html',
  styleUrls: ['./meaning-section.component.scss'],
})
export class MeaningSectionComponent {
  // Meaning properties
  @Input() wordNeedToLookUp = '';
  data: Mean = { ipa: '', defs: [] };
  allOfPos: number[] = [];
  currentWord: { type: number; vi: string[]; en: string[] } = {
    type: 0,
    vi: [],
    en: [],
  };

  finalViMeaning = '';
  finalEnMeaning = '';

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
  }

  @ViewChildren('posbtn') posbtns: any;
  @ViewChildren('pvi') pvi: any;
  @ViewChildren('pen') pen: any;

  constructor(
    private api: ApiConnectService,
    private anki: AnkiManipulationService
  ) {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.currentWord = { type: 0, vi: [], en: [] };

    this.posbtns._results.forEach((btn: any) => {
      btn.nativeElement.classList.add('bg-transparent');
      btn.nativeElement.classList.remove(
        'text-white',
        'bg-slate-500',
        '-translate-y-3'
      );
    });
    from(this.api.getMeanOfWord(this.wordNeedToLookUp)).subscribe((data) => {
      this.data = data;
      this.anki.setIpa(data.ipa);
      this.allOfPos = data.defs.map((word) => word.type);
      // this.currentWord = data.defs[0];

      // this.posbtns._results[0]?.nativeElement.classList.remove(
      //   'bg-transparent'
      // );
      // this.posbtns._results[0]?.nativeElement.classList.add(
      //   'text-white',
      //   'bg-slate-500',
      //   '-translate-y-3'
      // );
    });
    from(this.api.getSound(this.wordNeedToLookUp)).subscribe((data) => {
      this.anki.setAudioUrl(data);
    });
  }

  onEnMeaningChange(event: any) {
    this.anki.setEngDef(event);
  }

  onViMeaningChange(event: any) {
    this.anki.setBack(`(${getTypeReverse(this.currentWord.type)}) ${event}`);
    console.log(this.anki.getWord());
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.'
    from(this.api.getMeanOfWord(this.wordNeedToLookUp)).subscribe((data) => {
      this.data = data;
      this.allOfPos = data.defs.map((word) => word.type);
      // this.currentWord = data.defs[0];

      // this.posbtns._results[0]?.nativeElement.classList.remove(
      //   'bg-transparent'
      // );
      // this.posbtns._results[0]?.nativeElement.classList.add(
      //   'text-white',
      //   'bg-slate-500',
      //   '-translate-y-3'
      // );
    });
    // this.api.getMeanOfWord('fast').then((data) => {
    //   this.data = data;
    //   this.currentWord = data.defs[0];
  }

  onPosBtnClick(type: number, z: any) {
    // Change the current word
    this.currentWord = this.data.defs.find((word) => word.type === type)!;
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
    if (this.finalEnMeaning === means) {
      this.finalEnMeaning = '';
      event.target.classList.remove('bg-slate-500', 'text-white');
      return;
    }
    this.finalEnMeaning = means;
    this.anki.setEngDef(means);
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
    if (this.finalViMeaning === means) {
      this.finalViMeaning = '';
      event.target.classList.remove('bg-slate-500', 'text-white');
      return;
    }
    this.finalViMeaning = means;
    this.anki.setBack(`(${getTypeReverse(this.currentWord.type)}) ${means}`);
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
