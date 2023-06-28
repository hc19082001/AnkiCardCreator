import { Injectable } from '@angular/core';
import { ANKI_CONNECT_API, FullWord, Mean } from '../data';

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
  deckChoose: string = '';
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
  setDeckChoose(deckName: string) {
    this.deckChoose = deckName;
  }

  async invoke(action: string, version = 6, params = {}) {
    const result = await fetch(ANKI_CONNECT_API, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': 'http://localhost',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({ action, version, params }),
    });
    const data = await result.json();
    return data;
  }

  async getAllDecksName() {
    const data = await this.invoke('deckNames');
    return data.result;
  }
}
