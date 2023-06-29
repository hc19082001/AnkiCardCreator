import { Injectable } from '@angular/core';
import { ANKI_CONNECT_API, FullWord, Mean } from '../data';
import { getRandomIndexArray } from 'src/tools/POSHandle';

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

  async addCard(deckName: string, modelName: string, cardInfo: FullWord) {
    const {
      front,
      back,
      ipa,
      wf,
      synonyms,
      example,
      engDef,
      imageUrl,
      audioUrl,
    } = cardInfo;
    const data = await this.invoke('addNote', 6, {
      note: {
        deckName,
        modelName,
        fields: {
          'Mặt trước': front,
          'Mặt sau': back,
          'Phiên âm': ipa,
          'Họ từ vựng': wf,
          'Từ đồng nghĩa': synonyms,
          'Ví dụ': example,
          'Nghĩa tiếng anh': engDef,
        },
        options: {
          allowDuplicate: true,
        },
        picture: [
          {
            url: imageUrl,
            filename: `${front}.jpeg`,
            fields: ['Hình ảnh'],
          },
        ],
        audio: [
          {
            url: audioUrl,
            filename: `${front}.mp3`,
            fields: ['MP3 Phát âm'],
          },
        ],
      },
    }).catch((err) => console.log(err));
    return data.result;
  }

  async createMultiChoicesFields(deckName: string, step = 0) {
    return await this.invoke('findNotes', 6, {
      query: `deck:"${deckName}"`,
    }).then(async (result) => {
      //~ GET ID OF ALL CARDS IN DECK
      const cardsId = result.result;
      // console.log(cardsId);

      //~ GET ALL INFO OF CARDS
      const dt = await this.invoke('notesInfo', 6, {
        notes: cardsId,
      });
      // console.log(dt);

      //~ GET ALL VNese MEAN OF WORD
      const a = dt.result.map((card: any) => card.fields);
      const c = a.map((field: any) => field['Mặt sau'].value);
      console.log(c);

      //~ GET ALL SYNONYMS OF WORD
      const syns = a.map((card: any, index: any) => ({
        id: index,
        sys: card['Từ đồng nghĩa'].value,
      }));
      // console.log(syns);
      const arrHaveSyns = syns
        .filter((syn1: any) => syn1.sys !== '')
        .map((syn2: any) => syn2.sys.trim())
        .join(',')
        .split(',');
      console.log(arrHaveSyns);

      //~ SET ACTIONS ARRAY FOR UPDATE
      const arrActions = cardsId.map((cardId: any, index: any) => {
        const w_syn = syns.find((syn: any) => syn.id === index);
        let final_sysn = '';
        let final_means = '';
        if (w_syn.sys) {
          const arrSyns = w_syn.sys.split(',');
          let data = []; // DATA RANDOM
          let arrIndexRandom: any = [];
          for (let index = 0; index < arrSyns.length + step; index++) {
            if (arrIndexRandom.length === arrHaveSyns.length - arrSyns.length) {
              break;
            } else {
              let randomIndex = Math.floor(Math.random() * arrHaveSyns.length);
              while (
                arrSyns.filter((item: any) => item === arrHaveSyns[randomIndex])
                  .length > 0 ||
                arrIndexRandom.includes(randomIndex)
              ) {
                randomIndex = Math.floor(Math.random() * arrHaveSyns.length);
              }
              data.push(arrHaveSyns[randomIndex]);
              arrIndexRandom.push(randomIndex);
            }
          }
          final_sysn = data.join(',');
        }

        if (c.length === 0 || c.length === 1) {
          final_means = '';
        }

        if (c.length === 2) {
          let randomIndex = getRandomIndexArray(2, 1, index);
          final_means = c[randomIndex[0]];
        }

        if (c.length === 3) {
          let randomIndex = getRandomIndexArray(3, 2, index);
          final_means = `${c[randomIndex[0]]}|${c[randomIndex[1]]}`;
        }

        if (c.length > 3) {
          let randomIndex = getRandomIndexArray(c.length, 3, index);
          final_means = `${c[randomIndex[0]]}|${c[randomIndex[1]]}|${
            c[randomIndex[2]]
          }`;
        }

        return {
          action: 'updateNoteFields',
          version: 6,
          params: {
            note: {
              id: cardId,
              fields: {
                Choices: `${final_means}`,
                Syn_Wr_Field: `${final_sysn}`,
              },
            },
          },
        };
      });
      //~ UPDATE MULTIPLE CARDS
      const z = await this.invoke('multi', 6, {
        actions: arrActions,
      });
      return z.result;
    });
  }
}
