import { Injectable } from '@angular/core';
import { FullWord, Mean } from '../data';

@Injectable({
  providedIn: 'root',
})
export class AnkiManipulationService {
  data: FullWord = {
    front: '',
    back: '',
    engDef: '',
    ipa: '',
    imageUrl: '',
    audioUrl: '',
    synonyms: '',
    wf: '',
    example: '',
  };
  constructor() {}
  setFront(front: string) {
    this.data.front = front;
  }
  setEngDef(engDef: string) {
    this.data.engDef = engDef;
  }
  setExample(example: string) {
    this.data.example = example;
  }

  setBack(back: string) {
    this.data.back = back;
  }
  setIpa(ipa: string) {
    this.data.ipa = ipa;
  }
  setImageUrl(url: string) {
    this.data.imageUrl = url;
  }
  setAudioUrl(url: string) {
    this.data.audioUrl = url;
  }
  setSynonyms(synonyms: string) {
    this.data.synonyms = synonyms;
  }
  setWf(wf: string) {
    this.data.wf = wf;
  }
  getWord(): FullWord {
    return this.data;
  }
}
